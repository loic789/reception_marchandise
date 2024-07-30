import { Module } from '@nestjs/common';
import { RecblService } from './recbl.service';
import { RecblController } from './recbl.controller';
import { ClipperService } from 'src/clipper/clipper.service';

@Module({
  controllers: [RecblController],
  providers: [RecblService,ClipperService],
  // exports: [RecblModule]
})
export class RecblModule {}
