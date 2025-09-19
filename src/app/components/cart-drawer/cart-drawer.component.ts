import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStore } from '../../core/cart.store';
import { UserStore } from '../../core/user.store';
import { CheckoutComponent } from '../checkout/checkout.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-drawer.component.html',
  styleUrls: ['./cart-drawer.component.css'],
})
export class CartDrawerComponent {
  cartOpen = false;
  cartPinned = false;

  constructor(
    public cart: CartStore,
    public user: UserStore,
    private router: Router
  ) {}

  // ====== CARRITO ======
  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }

  cleanCart() {
    this.cart.clear();
    this.cartOpen = false;
  }

  togglePin() {
    this.cartPinned = !this.cartPinned;
    const body = document.body;
    const grid = document.getElementById('grid-cards');

    if (this.cartPinned) {
      this.cartOpen = true;
      body.classList.add('cart-pinned');

      if (grid) {
        // grid.classList.remove('products-grid'); // QUITAR la clase original
        grid.classList.add('cart-pinned-grid'); // AGREGAR la nueva
      }
    } else {
      body.classList.remove('cart-pinned');

      if (grid) {
        grid.classList.remove('cart-pinned-grid'); // QUITAR la pineada
        grid.classList.add('products-grid'); // VOLVER a la original
      }
    }
  }

  onCartBackdropClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('cart-drawer') && !this.cartPinned) {
      this.cartOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const target = event.target as HTMLElement;

    if (!this.cartPinned && this.cartOpen) {
      const clickedInsideDrawer = target.closest('.cart-drawer');
      const clickedCartButton = target.closest('.cart-button');
      const clickedNoClose = target.closest('.no-close'); // NUEVO

      if (!clickedInsideDrawer && !clickedCartButton && !clickedNoClose) {
        this.cartOpen = false;
      }
    }
  }

  // ====== PAGO ======
  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
}