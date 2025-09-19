import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../core/product.service';
import { Product } from '../../core/models/product.model';
import { CartStore } from '../../core/cart.store';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  modalOpen = false;

  constructor(
    private productService: ProductService,
    public cart: CartStore
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (res) => (this.products = res),
      error: (err) => console.error('Error cargando productos', err),
    });
  }

  truncate(text: string, length: number) {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
  }

  openModal(product: Product) {
    this.selectedProduct = product;
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
    this.selectedProduct = null;
  }

  closeModalOnOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('md_modal')) {
      this.closeModal();
    }
  }
}