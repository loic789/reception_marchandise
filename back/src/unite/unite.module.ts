import { Module } from '@nestjs/common';
import { UniteService } from './unite.service';
import { UniteController } from './unite.controller';
import { ClipperService } from 'src/clipper/clipper.service';

@Module({
  controllers: [UniteController],
  providers: [UniteService, ClipperService],
})
export class UniteModule {}
