import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },   // aquí ves productos
  { path: 'checkout', component: CheckoutComponent }, // aquí ves el checkout
];