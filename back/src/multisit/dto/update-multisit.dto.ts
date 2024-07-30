import { PartialType } from '@nestjs/swagger';
import { CreateMultisitDto } from './create-multisit.dto';

export class UpdateMultisitDto extends PartialType(CreateMultisitDto) {
    IDMULTISIT: number;
    MAGASIN: number;
    COARTI: string;
    QTE: string;
    QMIN: string;
    QMAX: string;
    DateInventaire: string;
    HeureInventaire: string;
    GIS: number;
    DMCLEUNIK: number;
    COARTIMAG: string;
}
