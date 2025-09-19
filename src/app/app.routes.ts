import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PurchaseSummaryComponent } from './components/purchase-summary/purchase-summary.component';
import { PaymentGuard } from './core/guards/payment.guard';

export const routes: Routes = [
  { path: '', component: ProductListComponent },   
  { path: 'checkout', component: CheckoutComponent }, // aquí ves el checkout/resumen del carrito
  { path: 'resumen', component: PurchaseSummaryComponent, canActivate: [PaymentGuard] }, // aquí ves la compra final confirmada
];