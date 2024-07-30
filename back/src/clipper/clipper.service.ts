import { Injectable, OnModuleDestroy, Logger } from "@nestjs/common";
import * as iconv from 'iconv-lite';
// import odbc from "odbc";
const odbc = require('odbc');
const utf8 = require('utf8');



@Injectable()
export class ClipperService implements OnModuleDestroy {
  private connection;
  private readonly logger = new Logger(ClipperService.name);

  async connect() {
    try {
      this.connection = await odbc.pool('DRIVER={HFSQL};Server Name=192.168.1.216;Server Port=4900; Database=AMACODEV;UID=root;PWD=root;');
      this.logger.log('Database connection established');
    } catch (error) {
      this.logger.error('Failed to connect to the database', error);
      throw error;
    }
  }

  enleverWhereLimit(requeteSql: string): string {
    // Trouver la position de WHERE 1 LIMIT 50
    const pattern = /WHERE 1 LIMIT 50/i;
    const match = requeteSql.match(pattern);
    
    if (match) {
        // Enlever la partie WHERE 1 LIMIT 50
        const position = match.index!;
        const requeteSansWhereLimit = requeteSql.substring(0, position).trim();
        return requeteSansWhereLimit;
    } else {
        // Si la requête ne contient pas WHERE 1 LIMIT 50, retourner la requête originale
        return requeteSql;
    }
}

  async query(sql: string, params: any[] = []): Promise<any> {
    try {
      if (!this.connection) {
        await this.connect();
      }
      const result = await this.connection.query(sql, params);
      const returnRes = []
      result.forEach(element => {
        if (!element.decimalDigits) {
          returnRes.push(this.convertBigIntToInt(this.trimObjectFields(element)))
        }
      });
      return returnRes;
    } catch (error) {
      this.logger.error(sql, error);
      if (this.isRecoverableError(error)) {
        this.logger.log('Attempting to reconnect to the database');
        this.connection = null;
        await this.connect();
        return this.query(sql, params);
      }
      throw error;
    }
  }

  convertBigIntToInt(obj) {
    if (typeof obj === 'bigint') {
      // Convertit bigint en number
      return Number(obj);
    } else if (Array.isArray(obj)) {
      // Si c'est un tableau, applique la fonction à chaque élément
      return obj.map(item => this.convertBigIntToInt(item));
    } else if (typeof obj === 'object' && obj !== null) {
      // Si c'est un objet, applique la fonction à chaque valeur
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, this.convertBigIntToInt(value)])
      );
    } else {
      // Si ce n'est ni bigint, ni tableau, ni objet, retourne la valeur telle quelle
      return obj;
    }
  }

  trimObjectFields(obj) {
    // Créez une copie de l'objet pour ne pas modifier l'original
    const trimmedObj = {};

    // Parcourez les clés de l'objet
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        // Si la valeur est une chaîne, appliquez trim()
        if (typeof obj[key] === 'string') {
          trimmedObj[key] = obj[key].trim();
        } else {
          trimmedObj[key] = obj[key];
        }
      }
    }

    return trimmedObj;
  }

  convertResult(result, typeAttributes) {
    return result.map(row => {
      const data = {};
      for (const attr of typeAttributes) {
        data[attr] = typeof row[attr] === 'string' ? row[attr].trim() : row[attr];
      }
      return data;
    });
  }

  private isRecoverableError(error: any): boolean {
    // Implémentez la logique pour déterminer si l'erreur est récupérable
    // Par exemple, vérifiez les codes d'erreur spécifiques
    return true; // À personnaliser selon vos besoins
  }

  async onModuleDestroy() {
    if (this.connection) {
      try {
        await this.connection.close();
        this.logger.log('Database connection closed');
      } catch (error) {
        this.logger.error('Failed to close the database connection', error);
      }
    }
  }
}
