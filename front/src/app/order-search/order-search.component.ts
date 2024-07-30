import { Component } from '@angular/core';
import { BcService } from '../bc.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.scss'],
})
export class OrderSearchComponent {
  orderCode: string = '';
  orderDetails: any = null;
  constructor(
    private bcService: BcService,
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit(): void { }


  formatDate(dateString: string) {
    if (dateString.length !== 8) {
      throw new Error("Le format de la date doit être YYYYMMDD");
    }

    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);

    return `${day}/${month}/${year}`;
  }

  async presentToast(message: string, duration: number = 2000, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: 'bottom', // Options: 'top', 'middle', 'bottom'
      color: color // Options: 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger', 'light', 'medium', 'dark'
    });
    toast.present();
  }

  searchOrder() {
    this.bcService.getBcByCOBC(this.orderCode).subscribe(
      (BC) => {
        let items = [] as Array<any>;
        BC.DETAILBC.forEach((detailbc: { LBCLEUNIK: any; ART: string; QTE: number; }) => {
          items.push({
            name: detailbc.ART,
            quantity: detailbc.QTE,
            LBCLEUNIK: detailbc.LBCLEUNIK
          });
        });
        this.orderDetails = {
          code: this.orderCode,
          date: this.formatDate(BC.DATEBC),
          status: 'Livrée',
          items: items
        };
        this.presentToast("Commande trouvée", 500, "success")

      },
      (error) => {
        // Code exécuté si la requête échoue
        this.presentToast("Commande inconnue", 500, "warning")
      }
    );
  }

  navigatePageValideBc(LBCLEUNIK: string) {
    this.router.navigate(['valideBc', { LBCLEUNIK: LBCLEUNIK }])
  }
}
