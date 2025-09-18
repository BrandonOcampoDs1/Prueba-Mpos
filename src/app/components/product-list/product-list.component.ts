import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../core/product.service';
import { Product } from '../../core/models/product.model';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CartStore } from '../../core/cart.store';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ProductCardComponent],
  template: `
    <section class="product-list">
      <h1>Productos</h1>
      <div class="products-grid">
        <div class="product-row" *ngFor="let p of products">
          <div class="product-info">
            <img [src]="p.image" [alt]="p.title" />
            <div class="product-details">
              <h3>{{ p.title }}</h3>
              <p class="price">\${{ p.price }}</p>
            </div>
          </div>
          <div class="product-actions">
            <button *ngIf="!cart.hasProduct(p)" (click)="addToCart(p)">Agregar</button>
            <div *ngIf="cart.hasProduct(p)" class="quantity-controls">
              <button (click)="decreaseQuantity(p)">-</button>
              <span>{{ cart.getQuantity(p) }}</span>
              <button (click)="increaseQuantity(p)">+</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Drawer del carrito -->
    <div class="cart-drawer" [class.open]="cartOpen">
      <h2>Carrito</h2>
      <ul>
        <li *ngFor="let item of cart.items()">
          {{ item.product.title }} x {{ item.quantity }} = \${{ item.product.price * item.quantity }}
        </li>
      </ul>
      <p>Total: \${{ cart.total() }}</p>
      <button (click)="toggleCart()">Cerrar</button>
    </div>

    <button class="cart-button" (click)="toggleCart()">Carrito ({{ cart.totalItems() }})</button>
  `,
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  cartOpen = false;

  constructor(private productService: ProductService, public cart: CartStore) {}

  ngOnInit() {
    this.cart.loadFromStorage(); // Carga persistente
    this.productService.getProducts().subscribe({
      next: (res) => (this.products = res),
      error: (err) => console.error('Error cargando productos', err),
    });
  }

  addToCart(product: Product) {
    this.cart.addProduct(product);
  }

  increaseQuantity(product: Product) {
    this.cart.addProduct(product);
  }

  decreaseQuantity(product: Product) {
    const currentQty = this.cart.getQuantity(product);
    if (currentQty > 1) {
      this.cart.updateQuantity(product.id, currentQty - 1);
    } else {
      this.cart.updateQuantity(product.id, 0);
    }
  }

  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }
}