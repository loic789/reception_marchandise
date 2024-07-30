import { Injectable } from '@nestjs/common';
import { CreateMultisitDto } from './dto/create-multisit.dto';
import { UpdateMultisitDto } from './dto/update-multisit.dto';
import { ClipperService } from 'src/clipper/clipper.service';
var Querybuilder = require('querybuilder');
var qb = new Querybuilder('mysql');
@Injectable()
export class MultisitService {
  constructor(
    private readonly clipperService: ClipperService,
  ) { }

  create(createMultisitDto: CreateMultisitDto) {
    const columns = Object.keys(createMultisitDto);
    if (columns.length === 0) {
      throw new Error("No columns to insert.");
    }

    const values = columns.map(key => {
      let value = createMultisitDto[key];
      if (typeof value === 'string') {
        // Echape les apostrophes dans les chaînes de caractères
        value = `'${value.replace(/'/g, "''")}'`;
      } else if (value === null || value === undefined) {
        // Gère les valeurs nulles
        value = 'NULL';
      } else if (typeof value === 'number') {
        // Les nombres n'ont pas besoin d'échappement
        value = value.toString();
      } else if (value instanceof Date) {
        value = `'${value.toISOString().split('T')[0]}'`;
      } else {
        throw new Error(`Unsupported data type for key ${key}`);
      }
      return value;
    });

    const query = `INSERT INTO MULTISIT (${columns.join(', ')}) VALUES (${values.join(', ')})`;
    return this.clipperService.query(query);
  }

  findAll() {
    return `This action returns all multisit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} multisit`;
  }

  async getByParams(multisit : UpdateMultisitDto) {
    var query = qb.select('*')
      .from('MULTISIT')
      .where(multisit)
      .call();
    query = query.replace(/`/g, '');

    let detailBcData = await this.clipperService.query(query)
    return await detailBcData
  }

  update(updateMultisitDto: UpdateMultisitDto) {
    const COARTI = updateMultisitDto.COARTI;
    let query = `UPDATE MULTISIT SET `;
    const columns = Object.keys(updateMultisitDto).filter(key => key !== 'COARTI');
    const values = columns.map(key => {
      let value = updateMultisitDto[key];
      if (typeof value === 'string') {
        // Echapper les guillemets simples en doublant les guillemets simples
        value = `'${value.replace(/'/g, "''")}'`;
      }
      return `${key} = ${value}`;
    }).join(', ');

    query += values;
    // Vérifier si COARTI est une chaîne de caractères et l'échapper si nécessaire
    let escapedCOARTI = COARTI;
    if (typeof COARTI === 'string') {
      escapedCOARTI = `'${COARTI.replace(/'/g, "''")}'`;
    }

    query += ` WHERE COARTI = ${escapedCOARTI}`;
    this.clipperService.query(query);
  }


  remove(id: number) {
    return `This action removes a #${id} multisit`;
  }
}
