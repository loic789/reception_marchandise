import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BcService } from '../bc.service';
import { IonModal, LoadingController } from '@ionic/angular';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-valide-bc',
  templateUrl: './valide-bc.component.html',
  styleUrls: ['./valide-bc.component.scss'],
})
export class ValideBcComponent implements OnInit {
  @ViewChild(IonModal)
  modal!: IonModal;
  sub: any;
  loading: any
  LBCLUNIK = "";
  bc = {
    COFOU: ""
  }
  detailBc = {
    ART: "",
    BL: "",
    COBC: "",
    QTE: 0,
    QTELIVR: 0,
    QTEREST: 0,
    OBS: "",
    DELAI: "",
  }

  constructor(
    private route: ActivatedRoute,
    private bcService: BcService,
    private formBuilder: FormBuilder
  ) {
    this.sub = this.route.params.subscribe(params => {
      this.bcService.getDetailBcByLBCLEUNIK(params['LBCLEUNIK']).subscribe((detailBc: any) => {
        this.detailBc = detailBc[0];
        this.LBCLUNIK = params['LBCLEUNIK']
        this.bcService.getBcByCOBC(this.detailBc.COBC).subscribe((BC: any) => {
          this.bc = BC


        })
      })
    });
  }


  ngOnInit() { }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  // submitReception() {
  //   this.cancel()
  // }

  onFormSubmit() {
    this.cancel()
    const bodyRecept = {
      LBCLUNIK: this.LBCLUNIK,
      QTERECU: this.detailBc.QTE,
      OBS: this.detailBc.OBS,
      BL: this.detailBc.BL
    }
    console.log(bodyRecept);
    this.bcService.postRecpt(bodyRecept).subscribe() 
    return;

  }
}
