import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateBcDto } from './dto/create-bc.dto';
import { UpdateBcDto } from './dto/update-bc.dto';
import { SelectBcDto } from './dto/select-bc.dto';
import { ClipperService } from 'src/clipper/clipper.service';
import { DetailbcService } from 'src/detailbc/detailbc.service';
import { SelectDetailbcDto } from 'src/detailbc/dto/select-detailbc.dto';

var Querybuilder = require('querybuilder');
var qb = new Querybuilder('mysql');

@Injectable()
export class BcService {

  constructor(
    private readonly clipperService: ClipperService,
    @Inject(forwardRef(() => DetailbcService))
    private readonly detailBcService: DetailbcService,

  ) { }  // Injecter le service


  create(createBcDto: CreateBcDto) {
    return 'This action adds a new bc';
  }

  findAll() {
    return `This action returns all bc`;
  }

  async getByParams(selectBcDto: SelectBcDto) {
    var query = qb.select('*')
      .from('BC')
      .where(selectBcDto)
      .call();
    query = query.replace(/`/g, '');
    let bcData = await this.clipperService.query(query) as SelectBcDto
    if(!bcData){
      return 500
    }
    //on cherche les details bc de bc 
    bcData = bcData[0];
    let detailbc = await  this.detailBcService.getByParams({COBC : bcData.COBC} as SelectDetailbcDto)
    bcData.DETAILBC = detailbc
    return await bcData
  }

  update(id: number, updateBcDto: UpdateBcDto) {
    return `This action updates a #${id} bc`;
  }

  remove(id: number) {
    return `This action removes a #${id} bc`;
  }
}
