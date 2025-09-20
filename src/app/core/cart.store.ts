import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from './models/cart.model';
import { Product } from './models/product.model';

@Injectable({ providedIn: 'root' })
export class CartStore {
  constructor() {
    this.loadFromStorage();
  }

  private _items = signal<CartItem[]>([]);
  items = this._items.asReadonly();

  total = computed(() =>
    this._items().reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    )
  );

  totalItems() {
    return this._items().reduce((acc, item) => acc + item.quantity, 0);
  }

  addProduct(product: Product) {
    const items = [...this._items()];
    const index = items.findIndex((i) => i.product.id === product.id);
    if (index >= 0) {
      items[index] = { ...items[index], quantity: items[index].quantity + 1 };
    } else {
      items.push({ product, quantity: 1 });
    }
    this._items.set(items);
    this.saveToStorage();
  }

  updateQuantity(productId: number, quantity: number) {
    const items = this._items().map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    this._items.set(items.filter((i) => i.quantity > 0));
    this.saveToStorage();
  }

  removeProduct(productId: number) {
    const currentItems = this._items(); // usar _items, no items
    const updated = currentItems.filter(item => item.product.id !== productId);
    this._items.set(updated); // actualizar el signal privado
    this.saveToStorage();
  }

  clear() {
    this._items.set([]);
    localStorage.removeItem('cart');
  }

  getQuantity(product: Product) {
    const item = this._items().find((i) => i.product.id === product.id);
    return item ? item.quantity : 0;
  }

  hasProduct(product: Product) {
    return this._items().some((i) => i.product.id === product.id);
  }

  private loadFromStorage() {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        this._items.set(JSON.parse(saved));
      } catch (e) {
        console.error('Error al cargar carrito desde storage', e);
      }
    }
  }

  private saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(this._items()));
  }
}
