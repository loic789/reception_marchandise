import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateDetailbcDto } from './dto/create-detailbc.dto';
import { UpdateDetailbcDto } from './dto/update-detailbc.dto';
import { Receptbc, SelectDetailbcDto } from './dto/select-detailbc.dto';
import { ClipperService } from 'src/clipper/clipper.service';
import { Resebc } from 'src/resebc/entities/resebc.entity';
import { ResebcService } from 'src/resebc/resebc.service';
import { SelectResebcDto } from 'src/resebc/dto/select-resebc.dto';
import { log } from 'console';
import { UpdateResebcDto } from 'src/resebc/dto/update-resebc.dto';
import { RecblService } from 'src/recbl/recbl.service';
import { CreateRecblDto } from 'src/recbl/dto/create-recbl.dto';
import { BcService } from 'src/bc/bc.service';
import { SelectBcDto } from 'src/bc/dto/select-bc.dto';
import { CreateBcDto } from 'src/bc/dto/create-bc.dto';
import { CreateResebcDto } from 'src/resebc/dto/create-resebc.dto';
import { ReserveService } from 'src/reserve/reserve.service';
import { SelectReserveDto } from 'src/reserve/dto/select-reserve.dto';
import { StockService } from 'src/stock/stock.service';
import { CreateStockDto } from 'src/stock/dto/create-stock.dto';
import { SelectRecblDto } from 'src/recbl/dto/select-recbl.dto';
import { MultisitService } from 'src/multisit/multisit.service';
import * as moment from 'moment';


import { UpdateMultisitDto } from 'src/multisit/dto/update-multisit.dto';
import { CreateMultisitDto } from 'src/multisit/dto/create-multisit.dto';
var Querybuilder = require('querybuilder');
var qb = new Querybuilder('mysql');
@Injectable()
export class DetailbcService {
  constructor(
    private readonly clipperService: ClipperService,
    private readonly reseBcService: ResebcService,
    private readonly recblService: RecblService,
    @Inject(forwardRef(() => BcService))
    private readonly bcService: BcService,
    @Inject(forwardRef(() => ReserveService))
    private readonly reserveService: ReserveService,
    @Inject(forwardRef(() => StockService))
    private readonly stockService: StockService,
    @Inject(forwardRef(() => MultisitService))
    private readonly multisitService: MultisitService,


  ) { }  // Injecter le service

  async receptBc(receptbc: Receptbc) {
    if (receptbc.BL) {
      console.log(receptbc);
      
      //je commence par chercher le detailbc
      try {
        let detailBcData = await this.getByParams({ LBCLEUNIK: receptbc.LBCLUNIK } as SelectDetailbcDto)
        detailBcData = detailBcData[0]
        let bcData = await this.bcService.getByParams({ COBC: detailBcData.COBC } as SelectBcDto)
        bcData = bcData as SelectBcDto
        let updateDetailbcData = new UpdateDetailbcDto();
        updateDetailbcData.LBCLEUNIK = detailBcData.LBCLEUNIK
        updateDetailbcData.QTELIVR = detailBcData.QTELIVR + receptbc.QTERECU
        updateDetailbcData.QTEREST = detailBcData.QTEREST - receptbc.QTERECU
        //impossible d'avoir une qte restante negative
        if (updateDetailbcData.QTEREST < 0) {
          updateDetailbcData.QTEREST = 0
        }
        updateDetailbcData.OBS = "a voir"
        this.update(updateDetailbcData)

        // detailBcData = info de la table detailBc
        // bcData = info de la table BC
        //receptbc = info utilisateur

        let createRecblData = new CreateRecblDto();
        createRecblData.NBLFOURN = receptbc.BL
        createRecblData.DATEREC = this.currentDate("DD/MM/YYYY")
        createRecblData.COFOU = bcData.COFOU
        createRecblData.DESA1 = detailBcData.DESA1
        createRecblData.NAF = detailBcData.NAF //voir 901
        createRecblData.TYPEBC = 3
        createRecblData.LBCLEUNIK = detailBcData.LBCLEUNIK
        createRecblData.QTE = detailBcData.QTE
        createRecblData.COBC = detailBcData.COBC
        createRecblData.DATESAISIE = this.currentDate("DD/MM/YYYY");
        createRecblData.FLAG = "O"
        createRecblData.QTESTOCK = "test" // a voir avec 108
        createRecblData.CODEEMP = "GPAO2"
        createRecblData.QteRecep = receptbc.QTERECU.toString()
        createRecblData.Unite = detailBcData.Unite
        createRecblData.CoefRecep = 1
        createRecblData.CoefUnite = detailBcData.CoefUnite
        createRecblData.CoefPrix = detailBcData.CoefPrix
        createRecblData.NBLFOURN = receptbc.BL
        this.recblService.create(createRecblData)
        let recblData = await this.clipperService.query("SELECT * FROM RECBL ORDER BY RBCLEUNIK DESC LIMIT 1") //pas ouf ouf as revoir
        recblData = recblData[0];
        let resebcDataListe = await this.reseBcService.getByParams({ LBCLEUNIK: receptbc.LBCLUNIK } as SelectResebcDto) as Array<SelectResebcDto>
        let quantitérestResa = receptbc.QTERECU
        let lastLigneReserve = await this.clipperService.query("SELECT * FROM RESERVE ORDER BY CORESE DESC LIMIT 1")
        lastLigneReserve = lastLigneReserve[0] as SelectReserveDto;
        let CORESE = lastLigneReserve.CORESE

        resebcDataListe.forEach(async resebc => {
          CORESE = CORESE + 1
          //gestion de la quantié rest pour les resas
          let currentQteResa = 0
          if (resebc.QTE <= quantitérestResa) {
            quantitérestResa = quantitérestResa - resebc.QTE
            currentQteResa = resebc.QTE
          } else {
            currentQteResa = quantitérestResa
            quantitérestResa = 0
          }
          //mise a jour de resebc
          this.reseBcService.update({ R1CLEUNIK: resebc.R1CLEUNIK, QTERECEPT: currentQteResa } as UpdateResebcDto)

          let selectReserveDto = new SelectReserveDto();
          selectReserveDto.CORESE = CORESE
          selectReserveDto.COARTI = detailBcData.ART
          selectReserveDto.QTERESE = currentQteResa.toString()
          selectReserveDto.MAGASIN = "1"
          selectReserveDto.IMPUTABLE = "O"
          selectReserveDto.NAF = resebc.NAF.toString()
          selectReserveDto.GACLEUNIK = resebc.GACLEUNIK
          selectReserveDto.NACLEUNIK = detailBcData.NACLEUNIK
          selectReserveDto.CODEEMP = "GPA02"
          selectReserveDto.DAT = this.currentDate("DD/MM/YYYY")
          this.reserveService.create(selectReserveDto)
        });
        //on mais a jour le stock
        // let CurrentRecblData = await this.recblService.getByParams({LBCLEUNIK : receptbc.LBCLUNIK } as SelectResebcDto) as SelectRecblDto

        let createStockda = new CreateStockDto()
        createStockda.RBCLEUNIK = recblData.RBCLEUNIK || 0 // a voir avec fédé
        createStockda.COARTI = detailBcData.ART
        createStockda.DESA1 = detailBcData.DESA1
        createStockda.DESA2 = detailBcData.DESA2
        createStockda.COFA = "a voir"
        createStockda.ENTSO = "E"
        createStockda.QTE = receptbc.QTERECU.toString() // a voir avec 108
        createStockda.MAGASIN = 1
        createStockda.DAT = this.currentDate("DD/MM/YYYY")
        createStockda.CODEEMP = "GPAO2"
        createStockda.NAF = recblData.NAF
        createStockda.IMPUTABLE = "N"
        createStockda.MONTANT = (detailBcData.QTELIVR * detailBcData.CoefPrix * detailBcData.PRIXR).toString()
        createStockda.DIVERS = "Récept. BL " + receptbc.BL
        createStockda.HEURE = this.currentHour()
        this.stockService.create(createStockda)
        let multiSiteData = await this.multisitService.getByParams({ COARTI: detailBcData.ART } as UpdateMultisitDto)
        multiSiteData = multiSiteData[0]
        if (multiSiteData) {
          this.multisitService.update({ COARTI: detailBcData.ART, QTE: (receptbc.QTERECU + multiSiteData.QTE).toString() } as UpdateMultisitDto)
        } else {
          this.multisitService.create({ MAGASIN: 1, COARTI: detailBcData.ART, QTE: receptbc.QTERECU.toString(), DateInventaire: this.currentDate("ymd"), HeureInventaire: this.currentHour() } as CreateMultisitDto)
        }
        return 200
      } catch (error) {
        return {
          error,
          msg: "commande not found",
        }
      }
    }
  }

  currentHour() {
    let now = new Date();

    // Formater l'heure sous la forme "His"
    let heures = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let secondes = String(now.getSeconds()).padStart(2, '0');

    let heureFormatee = heures + minutes + secondes;
    return heureFormatee
  }

  currentDate(format) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}${month}${day}`;
  }

  currentDateFr() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}${month}${year}`;
  }

  findAll() {
    return `This action returns all detailbc`;
  }

  async getByParams(selectDetailbcDto: SelectDetailbcDto) {
    var query = qb.select('*')
      .from('DETAILBC')
      .where(selectDetailbcDto)
      .call();
    query = query.replace(/`/g, '');

    let detailBcData = await this.clipperService.query(query)
    detailBcData = detailBcData;
    detailBcData.RESEBC = this.reseBcService.getByParams({ LBCLEUNIK: detailBcData[0].LBCLEUNIK } as any)
    return await detailBcData
  }

  update(updateDetailbcDto: UpdateDetailbcDto) {
    const LBCLEUNIK = updateDetailbcDto.LBCLEUNIK;
    let query = `UPDATE DETAILBC SET `;

    const columns = Object.keys(updateDetailbcDto).filter(key => key !== 'LBCLEUNIK');
    const values = columns.map(key => {
      let value = updateDetailbcDto[key];
      if (typeof value === 'string') {
        //echape les * ou '
        value = `'${value.replace(/'/g, "''")}'`;
      }
      return `${key} = ${value}`;
    }).join(', ');

    query += values;
    query += ` WHERE LBCLEUNIK = ${LBCLEUNIK}`;
    this.clipperService.query(query);
  }


  remove(id: number) {
    return `This action removes a #${id} detailbc`;
  }
}
