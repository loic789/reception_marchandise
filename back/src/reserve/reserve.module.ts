import { Module } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { ReserveController } from './reserve.controller';
import { ClipperService } from 'src/clipper/clipper.service';

@Module({
  controllers: [ReserveController],
  providers: [ReserveService, ClipperService],
})
export class ReserveModule {}
