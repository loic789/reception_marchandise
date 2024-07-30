import { PartialType } from '@nestjs/swagger';
import { CreateUniteDto } from './create-unite.dto';

export class UpdateUniteDto extends PartialType(CreateUniteDto) {}
