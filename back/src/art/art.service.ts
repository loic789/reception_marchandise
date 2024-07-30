import { Inject, Injectable } from '@nestjs/common';
import { CreateArtDto } from './dto/create-art.dto';
import { UpdateArtDto } from './dto/update-art.dto';
import { ClipperService } from 'src/clipper/clipper.service';
import { SelectArtDto } from './dto/select-art.dto';
import { log } from 'console';
var Querybuilder = require('querybuilder');
var qb = new Querybuilder('mysql');
@Injectable()
export class ArtService {

  constructor(private readonly clipperService: ClipperService) {}  // Injecter le service


  create(createArtDto: CreateArtDto) {
    return 'This action adds a new art';
  }

  async findAll() { 
  }

  async findArticleByParams(selectArtDto) {
    var query = qb.select('*')
              .from('ART')
              .where(selectArtDto)
              .call();
    query = query.replace(/`/g, '');
    let test = await  this.clipperService.query(query)  
    return await test
  } 

  update(id: number, updateArtDto: UpdateArtDto) {
    return `This action updates a #${id} art`;
  }

  remove(id: number) {
    return `This action removes a #${id} art`;
  }
}
