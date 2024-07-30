import { PartialType } from '@nestjs/mapped-types';
import { CreateBcDto } from './create-bc.dto';
import { SelectDetailbcDto } from 'src/detailbc/dto/select-detailbc.dto';

export class SelectBcDto {
    COBC: number; // Entier signé
    DATEBC: Date; // Date
    COFOU: string; // Texte
    EMT: string; // Texte
    DEST: string; // Texte
    COCLI: string; // Texte
    REFFOU: string; // Texte
    CODER: string; // Texte
    OBS: string; // Mémo texte
    INCOTERM: string; // Mémo texte
    TAUXTVA: number; // Monétaire
    FRANCO: number; // Entier non signé
    EDITE: string; // Texte
    ADRARC: number; // Entier signé
    ARCDEMANDE: string; // Texte
    DATEARC: Date; // Date
    DateImpression: Date; // Date
    NUMARC: string; // Texte
    OKAQ: string; // Texte
    FLAGTVA: string; // Texte
    NUMAVENANT: number; // Entier non signé
    DATAVENANT: Date; // Date
    ADRLIV: number; // Entier signé
    COMON: number; // Entier signé
    DETAILBC : Array<SelectDetailbcDto>
}
