import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { DeviseComponent } from './devise/devise.component';
import { FactureComponent } from './facture/facture.component';

const routes: Routes = [
  { path: 'customer', component: CustomerComponent },
  { path: 'facture', component: FactureComponent },
  { path: 'devises', component: DeviseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
