import { Controller, Get, Post, Body, Patch, Param, Delete, Injectable, Query } from '@nestjs/common';
import { WindChillService } from './wind-chill.service';
import { CreateWindChillDto } from './dto/create-wind-chill.dto';
import { UpdateWindChillDto } from './dto/update-wind-chill.dto';
import { SelectWindChillDto } from './dto/select-wind-chill.dto';

@Controller('wind-chill')
export class WindChillController {
  constructor(
    private readonly windChillService: WindChillService) {}

  @Get("getTokenWc")
  findAll(@Query() selectWindChillDto : SelectWindChillDto) {
    return this.windChillService.getTokenWc(selectWindChillDto.reference);
  }
  
  @Get("getPdfByArticle")
  getPdfByArticle(@Query() selectWindChillDto : SelectWindChillDto) {
    return this.windChillService.getPdfByArticle(selectWindChillDto.reference);
  }

  @Get("getPlan3d")
  getPlan3d(@Query() selectWindChillDto : SelectWindChillDto) {
    return this.windChillService.getPlan3d(selectWindChillDto.reference);
  }
}
