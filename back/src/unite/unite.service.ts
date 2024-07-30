import { Injectable } from '@nestjs/common';
import { CreateUniteDto } from './dto/create-unite.dto';
import { UpdateUniteDto } from './dto/update-unite.dto';
import { SelectUniteDto } from './dto/select-unite.dto';
import { ClipperService } from 'src/clipper/clipper.service';
var Querybuilder = require('querybuilder');
var qb = new Querybuilder('mysql');
@Injectable()
export class UniteService {

  constructor(
    private readonly clipperService: ClipperService,
  ) { }  // Injecter le servi


  create(createUniteDto: CreateUniteDto) {
    return 'This action adds a new unite';
  }

  findAll() {
    return `This action returns all unite`;
  }

  async getByParams(selectUniteDto: SelectUniteDto) {
    var query = qb.select('*')
      .from('Unite')
      .where(selectUniteDto)
      .call();
    query = query.replace(/`/g, '');
    let uniteData = await this.clipperService.query(query)
    return await uniteData
  }

  findOne(id: number) {
    return `This action returns a #${id} unite`;
  }

  update(id: number, updateUniteDto: UpdateUniteDto) {
    return `This action updates a #${id} unite`;
  }

  remove(id: number) {
    return `This action removes a #${id} unite`;
  }
}
