import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailbcDto } from './create-detailbc.dto';
import { SelectResebcDto } from 'src/resebc/dto/select-resebc.dto';

export class UpdateDetailbcDto extends PartialType(CreateDetailbcDto) {
    
    LBCLEUNIK: number;
  
    COBC: number;
  
    ART: string;
  
    DESA1: string;
  
    DESA2: string;
  
    DESA3: string;
  
    QTE: number;
  
    Unite: string;
  
    CoefUnite: number;
  
    QTELIVR: number;
  
    QTEREST: number;
  
    QTEFACT: number;
  
    QTERESTFACT: number;
  
    QTEALIVR: number;
  
    QTEAREST: number;
  
    DELAI: Date;
  
    DELAIINIT: Date;
  
    DATE: Date;
  
    NBJRELANCE: number;
  
    PRIXP: number;
  
    PRIXR: number;
  
    PCONSTANT: number;
  
    PRIXMON: number;
  
    UnitePrix: string;
  
    CoefPrix: number;
  
    REM: number;
  
    ANALYTIQ: string;
  
    LIVRE: string;
  
    FOURN: string;
  
    TYPEBC: number;
  
    KGMT: number;
  
    FAMILLE: string;
  
    CHRONO: number;
  
    NAF: number;
  
    NVQ: number;
  
    MAGASIN: number;
  
    OBS: string;
  
    OBSINTERNE: string;
  
    CLEUNIK2: number;
  
    CODA: number;
  
    TACLEUNIK: number;
  
    GACLEUNIK: number;
  
    NACLEUNIK: number;
  
    BLOCAGE: number;
  
    FLAGCC: string;
  
    POSTE: string;
  
    DMCLEUNIK: number;
  
    PCONSTANTMON: number;
  
    LIGNE: number;
  
    EMTORIGINE: string;
  
    SPECIFIQUE: string;
  
    CLEBC: boolean;
  
    ARTLIV: boolean;


}
