import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { OrderSearchComponent } from './order-search/order-search.component';
import { ValideBcComponent } from './valide-bc/valide-bc.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'order-search',
    pathMatch: 'full'
  },
  {
    path: 'order-search',
    component: OrderSearchComponent
  },
  {
    path: 'valideBc',
    component: ValideBcComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
