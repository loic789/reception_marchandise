import { Injectable } from '@nestjs/common';
import { CreateRecblDto } from './dto/create-recbl.dto';
import { UpdateRecblDto } from './dto/update-recbl.dto';
import { ClipperService } from 'src/clipper/clipper.service';
import { SelectResebcDto } from 'src/resebc/dto/select-resebc.dto';
var Querybuilder = require('querybuilder');
var qb = new Querybuilder('mysql');
@Injectable()
export class RecblService {

  constructor(
    private readonly clipperService: ClipperService,
  ) { }

  create(createRecblDto: CreateRecblDto) {
    const columns = Object.keys(createRecblDto);
    if (columns.length === 0) {
      throw new Error("No columns to insert.");
    }

    const values = columns.map(key => {
      let value = createRecblDto[key];
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

    const query = `INSERT INTO RECBL (${columns.join(', ')}) VALUES (${values.join(', ')})`;
    return this.clipperService.query(query);
  }


  findAll() {
    return `This action returns all recbl`;
  }

  async getByParams(selectResebcDto : SelectResebcDto) {
    var query = qb.select('*')
      .from('RECBL')
      .where(selectResebcDto)
      .call();
    query = query.replace(/`/g, '');

    let detailBcData = await this.clipperService.query(query)
    return await detailBcData
  }

  findOne(id: number) {
    return `This action returns a #${id} recbl`;
  }

  update(id: number, updateRecblDto: UpdateRecblDto) {
    return `This action updates a #${id} recbl`;
  }

  remove(id: number) {
    return `This action removes a #${id} recbl`;
  }
}
