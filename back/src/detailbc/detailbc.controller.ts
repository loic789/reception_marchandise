import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DetailbcService } from './detailbc.service';
import { CreateDetailbcDto } from './dto/create-detailbc.dto';
import { UpdateDetailbcDto } from './dto/update-detailbc.dto';
import { query } from 'express';
import { Receptbc, SelectDetailbcDto } from './dto/select-detailbc.dto';

@Controller('detailbc')
export class DetailbcController {
  constructor(private readonly detailbcService: DetailbcService) {}
  //debut d'une reception de marchandise
  
  @Post("receptBc")
  receptBc(@Body() receptbc: Receptbc) {
    return this.detailbcService.receptBc(receptbc);
  }
  
  @Get()
  findAll() {
    return this.detailbcService.findAll();
  }

  @Get('getByParams')
  getByParams(@Query() selectDetailbcDto: SelectDetailbcDto) {
    return this.detailbcService.getByParams(selectDetailbcDto);
  }

  @Patch()
  update(@Body() updateDetailbcDto: UpdateDetailbcDto) {
    return this.detailbcService.update(updateDetailbcDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detailbcService.remove(+id);
  }
}
