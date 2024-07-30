import { Module } from '@nestjs/common';
import { WindChillService } from './wind-chill.service';
import { WindChillController } from './wind-chill.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { RecblService } from 'src/recbl/recbl.service';

@Module({
  imports : [HttpModule, ConfigModule],
  controllers: [WindChillController],
  providers: [WindChillService],
})
export class WindChillModule {}
