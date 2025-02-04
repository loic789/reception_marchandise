import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArtService } from './art.service';
import { CreateArtDto } from './dto/create-art.dto';
import { UpdateArtDto } from './dto/update-art.dto';
import { SelectArtDto } from './dto/select-art.dto';

@Controller('art')
export class ArtController {
  constructor(private readonly artService: ArtService) {}

  @Post()
  create(@Body() createArtDto: CreateArtDto) {
    return this.artService.create(createArtDto);
  }

  @Get()
  findAll() {
    return this.artService.findAll();
  }

  @Post("/findArticleByParams")
  findArticleByParams(@Body() selectArtDto: SelectArtDto) {
    return this.artService.findArticleByParams(selectArtDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArtDto: UpdateArtDto) {
    return this.artService.update(+id, updateArtDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artService.remove(+id);
  }
}
