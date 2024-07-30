import { Injectable } from '@nestjs/common';
import { CreateResebcDto } from './dto/create-resebc.dto';
import { UpdateResebcDto } from './dto/update-resebc.dto';
import { SelectResebcDto } from './dto/select-resebc.dto';
import { ClipperService } from 'src/clipper/clipper.service';
var Querybuilder = require('querybuilder');
var qb = new Querybuilder('mysql');

@Injectable()
export class ResebcService {

  constructor(
    private readonly clipperService: ClipperService,
  ) { }  // Injecter le service

  create(createResebcDto: CreateResebcDto) {
    const columns = Object.keys(createResebcDto);
    if (columns.length === 0) {
      throw new Error("No columns to insert.");
    }

    const values = columns.map(key => {
      let value = createResebcDto[key];
      if (typeof value === 'string') {
        // Echape les apostrophes dans les chaînes de caractères
        value = `'${value.replace(/'/g, "''")}'`;
      } else if (value === null || value === undefined) {
        // Gère les valeurs nulles
        value = 'NULL';
      }
      return value;
    });

    const query = `INSERT INTO RESEBC (${columns.join(', ')}) VALUES (${values.join(', ')})`;
    this.clipperService.query(query);
  }

  findAll() {
    return `This action returns all resebc`;
  }

  async getByParams(selectResebcDto: SelectResebcDto) {
    var query = qb.select('*')
      .from('RESEBC')
      .where(selectResebcDto)
      .call();
    query = query.replace(/`/g, '');
    let resebcData = await this.clipperService.query(query)
    return await resebcData
  }

  update(updateResebcDto: UpdateResebcDto) {
    const R1CLEUNIK = updateResebcDto.R1CLEUNIK;
    let query = `UPDATE RESEBC SET `;
    const columns = Object.keys(updateResebcDto).filter(key => key !== 'R1CLEUNIK');
    const values = columns.map(key => {
      let value = updateResebcDto[key];
      if (typeof value === 'string') {
        //echape les * ou '
        value = `'${value.replace(/'/g, "''")}'`;
      }
      return `${key} = ${value}`;
    }).join(', ');

    query += values;
    query += ` WHERE R1CLEUNIK = ${R1CLEUNIK}`;
    return this.clipperService.query(query);
  }

  remove(id: number) {
    return `This action removes a #${id} resebc`;
  }
}
