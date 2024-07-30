import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BcService } from './bc.service';
import { CreateBcDto } from './dto/create-bc.dto';
import { UpdateBcDto } from './dto/update-bc.dto';
import { query } from 'express';
import { SelectBcDto } from './dto/select-bc.dto';

@Controller('bc')
export class BcController {
  constructor(private readonly bcService: BcService) {}

  @Post()
  create(@Body() createBcDto: CreateBcDto) {
    return this.bcService.create(createBcDto);
  }

  @Get()
  findAll() {
    return this.bcService.findAll();
  }

  @Get('getByParams')
  getByParams(@Query() selectBcDto: SelectBcDto) {
    return this.bcService.getByParams(selectBcDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBcDto: UpdateBcDto) {
    return this.bcService.update(+id, updateBcDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bcService.remove(+id);
  }
}
