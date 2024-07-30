import { PartialType } from '@nestjs/swagger';
import { CreateRecblDto } from './create-recbl.dto';

export class UpdateRecblDto extends PartialType(CreateRecblDto) {}
