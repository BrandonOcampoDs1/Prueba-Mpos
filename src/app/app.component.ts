import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CartDrawerComponent } from './components/cart-drawer/cart-drawer.component';
import { AccountModal } from './components/account-modal/account-modal.component';
import { CartStore } from './core/cart.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    CartDrawerComponent,
    AccountModal,
    CommonModule,
  ],
  // providers: [CartStore] // opcional si quieres que se cree aquí
})
export class AppComponent {
  cartOpen = false;
  cartPinned = false;

  // 🔹 Constructor para exponer el cart en la plantilla
  constructor(public cart: CartStore) {}

  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }
}
