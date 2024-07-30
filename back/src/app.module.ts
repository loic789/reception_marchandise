import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClipperService } from './clipper/clipper.service';
import { ArtModule } from './art/art.module';
import { WindChillModule } from './wind-chill/wind-chill.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { DetailbcModule } from './detailbc/detailbc.module';
import { BcModule } from './bc/bc.module';
import { ResebcModule } from './resebc/resebc.module';
import { RecblModule } from './recbl/recbl.module';
import { UniteModule } from './unite/unite.module';
import { ReserveModule } from './reserve/reserve.module';
import { StockModule } from './stock/stock.module';
import { MultisitModule } from './multisit/multisit.module';



@Module({
  imports: [ArtModule, WindChillModule, ConfigModule.forRoot(), HttpModule, DetailbcModule, BcModule, ResebcModule, RecblModule, UniteModule, ReserveModule, StockModule, MultisitModule],
  controllers: [AppController],
  providers: [AppService, ClipperService],
})
export class AppModule {}
