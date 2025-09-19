import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserStore } from '../../core/user.store';
import { CartStore } from '../../core/cart.store';
import { PaymentGuard } from '../../core/guards/payment.guard';
import { Router } from '@angular/router';
import { CheckoutComponent } from '../checkout/checkout.component';
import { FundsModalComponent } from '../funds-modal/funds-modal.component';

@Component({
  selector: 'account-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, FundsModalComponent],
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.css'],
})
export class AccountModal {
  modalOpen = false;
  form = { name: '', cardNumber: '', expiry: '', cvv: '' };
  fundsModalOpen = false;
  fundsTitle = '';
  fundsAction: 'add' | 'remove' = 'add';
  items: any;
  total: any;
  fundsModalVisible = false;

  constructor(
    public user: UserStore,
    public cart: CartStore,
    private router: Router,
    private paymentGuard: PaymentGuard
  ) {}

  ngOnInit() {
    this.items = this.cart.items;
    this.total = this.cart.total;
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal(event?: MouseEvent) {
    if (
      !event ||
      (event.target as HTMLElement).classList.contains('checkout-modal')
    ) {
      this.modalOpen = false;
    }
  }

  closeModalOnOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('md_modal')) {
      this.closeModal();
    }
  }

  openFundsModal(action: 'add' | 'remove') {
    this.fundsAction = action;
    this.fundsTitle = action === 'add' ? 'Agregar fondos' : 'Retirar fondos';
    this.fundsModalOpen = true;
  }

  handleFunds(amount: number) {
    if (this.fundsAction === 'add') {
      this.user.updateBalance(amount);
    } else {
      this.user.updateBalance(-amount);
    }
    this.fundsModalVisible = false;
  }

  addFunds() {
    this.fundsAction = 'add';
    this.fundsModalVisible = true;
  }

  removeFunds() {
    this.fundsAction = 'remove';
    this.fundsModalVisible = true;
  }

  isExpiryValid(): boolean {
    return /^\d{2}\/\d{2}$/.test(this.form.expiry);
  }

  // account-modal.component.ts
  onCvvInput() {
    if (this.form.cvv) {
      this.form.cvv = this.form.cvv.replace(/[^0-9]/g, '');
    }
  }

  // account-modal.component.ts
  onCardNumberInput() {
    if (this.form.cardNumber) {
      this.form.cardNumber = this.form.cardNumber.replace(/[^0-9]/g, '');
    }
  }

  registerUser() {
    if (
      !this.form.name ||
      !this.form.cardNumber ||
      !this.isExpiryValid() ||
      !this.form.cvv
    ) {
      return; // opcional: mostrar alert o error
    }
    this.user.registerAccount({ ...this.form, balance: 0 });
    this.modalOpen = false;
  }
}
