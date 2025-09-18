import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../core/models/product.model';
import { CartStore } from '../../core/cart.store';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <img [src]="product.image" [alt]="product.title" />
      <h3>{{ product.title }}</h3>
      <p>\${{ product.price }}</p>
      <button (click)="addToCart()">Agregar al carrito</button>
    </div>
  `,
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  constructor(private cart: CartStore) {}

  addToCart() {
    this.cart.addProduct(this.product);
  }
}