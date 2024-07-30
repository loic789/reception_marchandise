import { forwardRef, Module } from '@nestjs/common';
import { BcService } from './bc.service';
import { BcController } from './bc.controller';
import { ClipperService } from 'src/clipper/clipper.service';
import { Detailbc } from 'src/detailbc/entities/detailbc.entity';
import { DetailbcService } from 'src/detailbc/detailbc.service';
import { ResebcService } from 'src/resebc/resebc.service';
import { RecblService } from 'src/recbl/recbl.service';
import { DetailbcModule } from 'src/detailbc/detailbc.module';
import { ReserveModule } from 'src/reserve/reserve.module';
import { ReserveService } from 'src/reserve/reserve.service';
import { StockService } from 'src/stock/stock.service';
import { MultisitModule } from 'src/multisit/multisit.module';
import { MultisitService } from 'src/multisit/multisit.service';

@Module({
  controllers: [BcController],
  imports: [forwardRef(() => Detailbc ),forwardRef(() => DetailbcModule), forwardRef(() => ReserveModule),forwardRef(() => MultisitModule)],
  providers: [BcService, ClipperService, DetailbcService, ResebcService, RecblService, ReserveService, StockService, MultisitService],
})
export class BcModule {}
