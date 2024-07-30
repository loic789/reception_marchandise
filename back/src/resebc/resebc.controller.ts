import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResebcService } from './resebc.service';
import { CreateResebcDto } from './dto/create-resebc.dto';
import { UpdateResebcDto } from './dto/update-resebc.dto';
import { SelectResebcDto } from './dto/select-resebc.dto';

@Controller('resebc')
export class ResebcController {
  constructor(private readonly resebcService: ResebcService) {}

  @Post()
  create(@Body() createResebcDto: CreateResebcDto) {
    return this.resebcService.create(createResebcDto);
  }

  @Get()
  findAll() {
    return this.resebcService.findAll();
  }

  @Get('getByParams')
  getByParams(@Query() selectResebcDto: SelectResebcDto) {
    return this.resebcService.getByParams(selectResebcDto);
  }

  @Patch()
  update( @Body() updateResebcDto: UpdateResebcDto) {
    return this.resebcService.update(updateResebcDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resebcService.remove(+id);
  }
}
