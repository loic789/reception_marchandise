import { forwardRef, Module } from '@nestjs/common';
import { DetailbcService } from './detailbc.service';
import { DetailbcController } from './detailbc.controller';
import { ClipperService } from 'src/clipper/clipper.service';
import { ResebcService } from 'src/resebc/resebc.service';
import { Resebc } from 'src/resebc/entities/resebc.entity';
import { RecblService } from 'src/recbl/recbl.service';
import { BcModule } from 'src/bc/bc.module';
import { BcService } from 'src/bc/bc.service';
import { ReserveService } from 'src/reserve/reserve.service';
import { ReserveModule } from 'src/reserve/reserve.module';
import { StockService } from 'src/stock/stock.service';
import { StockModule } from 'src/stock/stock.module';
import { MultisitService } from 'src/multisit/multisit.service';
import { MultisitModule } from 'src/multisit/multisit.module';

@Module({
  imports: [forwardRef(() => BcModule), forwardRef(() => ReserveModule), forwardRef(() => StockModule),forwardRef(() => MultisitModule)],
  controllers: [DetailbcController],
  providers: [DetailbcService, ClipperService, ResebcService, RecblService, BcService, ReserveService, StockService, MultisitService],

})
export class DetailbcModule {}
