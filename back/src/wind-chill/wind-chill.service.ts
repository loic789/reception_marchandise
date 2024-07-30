import { Injectable } from '@nestjs/common';
import { CreateWindChillDto } from './dto/create-wind-chill.dto';
import { UpdateWindChillDto } from './dto/update-wind-chill.dto';
import { SelectWindChillDto } from './dto/select-wind-chill.dto';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { log } from 'console';
@Injectable()
export class WindChillService {
  constructor(private readonly httpService: HttpService,
    private readonly configService: ConfigService,

  ) { }

  async getTokenWc(reference: SelectWindChillDto["reference"]) {
    const url = process.env.URL_WINDCHILL + "servlet/odata/v3/CADDocumentMgmt/CADDocuments?%24filter=Number%20eq%20'" + this.convertReferenceWc(reference) + "'&%24count=false";
    // Récupérer le nom d'utilisateur et le mot de passe des variables d'environnement
    const username = process.env.WINDCHILL_USERNAME;
    const password = process.env.WINDCHILL_PASSWORD;

    try {
      const response = await firstValueFrom(
        this.httpService.get(url, {
          auth: {
            username: username,
            password: password,
          },
        }),
      );
      return response.data.value[0].ID;
    } catch (error) {
      console.error('Erreur lors de la récupération des données de l\'API externe', error);
      throw error;
    }
  }

  async getPdfByArticle(reference: string): Promise<string> {
    try {
      reference = this.convertReferenceWc(reference);
      const idWc = await this.getTokenWc(reference);

      const username = this.configService.get<string>('WINDCHILL_USERNAME');
      const password = this.configService.get<string>('WINDCHILL_PASSWORD');
      const url = `${this.configService.get<string>('URL_WINDCHILL')}servlet/odata/v3/CADDocumentMgmt/CADDocuments('${idWc}')/Representations?%24count=false`;

      const response = await firstValueFrom(
        this.httpService.get(url, {
          auth: {
            username: username,
            password: password,
          },
        }),
      );

      if (response.data.value[0].AdditionalFiles) {
        const pdfUrl = response.data.value[0].AdditionalFiles[0].URL;

        // Télécharger le PDF
        const pdfResponse = await firstValueFrom(
          this.httpService.get(pdfUrl, {
            auth: {
              username: username,
              password: password,
            }, responseType: 'arraybuffer'
          }),
        );
        const pdfData = pdfResponse.data;

        // Définir un chemin temporaire pour le fichier PDF
        const pdfPath = path.join(__dirname, 'temp.pdf');

        // Écrire le fichier PDF
        fs.writeFileSync(pdfPath, pdfData);

        return await pdfResponse.data;
      } else {
        throw new Error('PDF non trouvé');
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des données de l'API externe", error);
      throw error;
    }
  }

  convertReferenceWc(reference: string) {
    if (reference) {
      reference = reference.replace(/ /g, '-').replace(/\//g, '-');
      return reference;
    }
  }

  async getPlan3d(reference: string) {
    try {
      // Convertir la référence
      reference = this.convertReferenceWc(reference);
      const idWc = await this.getTokenWc(reference);

      // Récupérer les informations de connexion depuis la configuration
      const username = this.configService.get<string>('WINDCHILL_USERNAME');
      const password = this.configService.get<string>('WINDCHILL_PASSWORD');

      // Construire l'URL
      const url = `http://srvptc2.cop-amaco.local/Windchill/wtcore/jsp/wvs/viewthumbnail.jsp?objref=OR:wt.epm.EPMDocument:798804800`;

      // Effectuer la requête HTTP
      const response = await firstValueFrom(
        this.httpService.get(url, {
          auth: {
            username,
            password,
          },
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
          }
        })
      );

      // Retourner la réponse
      return response.data;

    } catch (error) {
      // Gérer l'erreur et loguer un message
      console.error('Erreur lors de l\'accès à l\'URL', error);
      throw new Error('Erreur lors de l\'accès à l\'URL');
    }
  }


}
