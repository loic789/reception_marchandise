import { Module } from '@nestjs/common';
import { ArtService } from './art.service';
import { ArtController } from './art.controller';
import { ClipperService } from 'src/clipper/clipper.service';
import { RecblService } from 'src/recbl/recbl.service';

@Module({
  imports : [],
  controllers: [ArtController],
  providers: [ArtService, ClipperService, RecblService],
  exports : [ArtService],
})
export class ArtModule {}
