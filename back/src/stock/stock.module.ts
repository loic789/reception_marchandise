import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { ClipperService } from 'src/clipper/clipper.service';

@Module({
  controllers: [StockController],
  providers: [StockService , ClipperService],
})
export class StockModule {}
