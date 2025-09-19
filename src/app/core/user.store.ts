import { Injectable, signal } from '@angular/core';

export interface UserAccount {
  name: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  balance: number;
}

@Injectable({ providedIn: 'root' })
export class UserStore {
  private readonly STORAGE_KEY = 'userAccount';

  account = signal<UserAccount | null>(null);

  constructor() {
    this.loadFromStorage();
  }

  private saveToStorage() {
    if (this.account()) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.account()));
    } else {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  private loadFromStorage() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.account.set(JSON.parse(data));
    }
  }

  registerAccount(user: UserAccount) {
    this.account.set(user);
    this.saveToStorage();
  }

  updateBalance(amount: number) {
    const acc = this.account();
    if (!acc) return;
    this.account.set({ ...acc, balance: acc.balance + amount });
    this.saveToStorage();
  }

  clearAccount() {
    this.account.set(null);
    this.saveToStorage();
  }
}
