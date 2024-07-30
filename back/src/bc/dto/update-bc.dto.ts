import { PartialType } from '@nestjs/mapped-types';
import { CreateBcDto } from './create-bc.dto';

export class UpdateBcDto extends PartialType(CreateBcDto) {}
