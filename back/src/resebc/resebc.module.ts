import { Module } from '@nestjs/common';
import { ResebcService } from './resebc.service';
import { ResebcController } from './resebc.controller';
import { ClipperService } from 'src/clipper/clipper.service';
import { RecblService } from 'src/recbl/recbl.service';

@Module({
  controllers: [ResebcController],
  providers: [ResebcService, ClipperService],
})
export class ResebcModule {}
