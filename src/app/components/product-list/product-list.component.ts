import { Component, OnInit, HostListener } from '@angular/core';
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
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  cartOpen = false;
  cartPinned = false;

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

  isMobile() {
    return window.innerWidth < 768;
  }

  toggleCart() {
    this.cartOpen = !this.cartOpen;
  }

  onCartBackdropClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('cart-drawer') && !this.cartPinned) {
      this.cartOpen = false;
    }
  }

  cleanCart() {
    this.cart.clear(); // limpia todos los items del carrito
    this.cartOpen = false; // opcional: cierra el carrito después de limpiar
  }

  togglePin() {
    this.cartPinned = !this.cartPinned;
    const body = document.body;
    const grid = document.getElementById('grid-cards');

    if (this.cartPinned) {
      this.cartOpen = true;
      body.classList.add('cart-pinned');
      if (grid) {
        // grid.classList.remove('products-grid');
        grid.classList.add('cart-pinned-grid');
      }
    } else {
      body.classList.remove('cart-pinned');
      if (grid) {
        grid.classList.remove('cart-pinned-grid');
        grid.classList.add('products-grid');
      }
    }
  }

@HostListener('document:click', ['$event'])
onClickOutside(event: Event) {
  const target = event.target as HTMLElement;

  // Si el carrito NO está fijado y está abierto
  if (!this.cartPinned && this.cartOpen) {

    // Verifica si el click NO está en el drawer ni en los botones de acción dentro
    const clickedInsideDrawer = target.closest('.cart-drawer');
    const clickedCartButton = target.closest('.cart-button');
    const clickedActionButton = target.closest('.product-actions');

    if (!clickedInsideDrawer && !clickedCartButton && !clickedActionButton) {
      this.cartOpen = false;
    }
  }
}


  selectedProduct: any = null;
  modalOpen = false;

  truncate(text: string, length: number) {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
  }

  openModal(product: any) {
    this.selectedProduct = product;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  closeModalOnOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('md_modal')) {
      this.closeModal();
    }
  }
}