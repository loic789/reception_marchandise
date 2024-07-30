import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MultisitService } from './multisit.service';
import { CreateMultisitDto } from './dto/create-multisit.dto';
import { UpdateMultisitDto } from './dto/update-multisit.dto';

@Controller('multisit')
export class MultisitController {
  constructor(private readonly multisitService: MultisitService) {}

  @Post()
  create(@Body() createMultisitDto: CreateMultisitDto) {
    return this.multisitService.create(createMultisitDto);
  }

  @Get()
  findAll() {
    return this.multisitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.multisitService.findOne(+id);
  }

  @Patch(':id')
  update(@Body() updateMultisitDto: UpdateMultisitDto) {
    return this.multisitService.update(updateMultisitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.multisitService.remove(+id);
  }
}
