import { Module } from '@nestjs/common';
import { MultisitService } from './multisit.service';
import { MultisitController } from './multisit.controller';
import { ClipperService } from 'src/clipper/clipper.service';

@Module({
  controllers: [MultisitController],
  providers: [MultisitService, ClipperService],
})
export class MultisitModule {}
