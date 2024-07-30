import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecblService } from './recbl.service';
import { CreateRecblDto } from './dto/create-recbl.dto';
import { UpdateRecblDto } from './dto/update-recbl.dto';

@Controller('recbl')
export class RecblController {
  constructor(private readonly recblService: RecblService) {}

  @Post()
  create(@Body() createRecblDto: CreateRecblDto) {
    return this.recblService.create(createRecblDto);
  }

  @Get()
  findAll() {
    return this.recblService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recblService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecblDto: UpdateRecblDto) {
    return this.recblService.update(+id, updateRecblDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recblService.remove(+id);
  }
}
