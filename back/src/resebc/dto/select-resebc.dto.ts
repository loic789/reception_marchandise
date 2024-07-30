import { PartialType } from '@nestjs/mapped-types';
import { CreateResebcDto } from './create-resebc.dto';

export class SelectResebcDto {
    R1CLEUNIK : number
    LBCLEUNIK : number
    NAF : number
    GACLEUNIK : number
    NACLEUNIK : number
    QTE : number
    QTERECEPT : number
    CODEEMP : number
    DATE : string
}
