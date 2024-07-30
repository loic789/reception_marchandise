import { PartialType } from '@nestjs/swagger';
import { CreateWindChillDto } from './create-wind-chill.dto';

export class UpdateWindChillDto extends PartialType(CreateWindChillDto) {}
