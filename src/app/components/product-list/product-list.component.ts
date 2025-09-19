import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../core/product.service';
import { Product } from '../../core/models/product.model';
import { CartStore } from '../../core/cart.store';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  selectedProduct: Product | null = null;
  modalOpen = false;
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 9; 

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

    get filteredProducts(): Product[] {
    const filtered = this.products.filter(
      (p) =>
        p.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    const start = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    const filteredCount = this.products.filter(
      (p) =>
        p.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).length;

    return Math.ceil(filteredCount / this.itemsPerPage);
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