import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserStore } from '../../core/user.store';
import { CartStore } from '../../core/cart.store';
import { PaymentGuard } from '../../core/guards/payment.guard';
import { Router } from '@angular/router';
import { AccountModal } from '../account-modal/account-modal.component';
import { ModalComponent } from '../modal/modal.component'; 

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, AccountModal, ModalComponent],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  @ViewChild(AccountModal) accountModal!: AccountModal;

  items: any;
  total: any;
  modalVisible = false;
  modalTitle = '';
  modalMessage = '';
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

  closeModal() {
  this.modalVisible = false;
}


confirmarCompra() {
    if (!this.user.account()) {
      this.modalTitle = 'Cuenta requerida';
      this.modalMessage = 'Debes registrar una cuenta antes de pagar.';
      this.modalVisible = true;

      // si quieres abrir también el modal de cuenta:
      this.accountModal.openModal();
      return;
    }

    const acc = this.user.account()!;
    const total = this.cart.total();

    if (acc.balance < total) {
      this.modalTitle = 'Fondos insuficientes';
      this.modalMessage = 'Recarga tu saldo para poder completar la compra.';
      this.modalVisible = true;
      return;
    }

    // ✅ Pago real
    this.user.updateBalance(-total);

    const summary = {
      name: acc.name,
      total,
      items: this.cart.items(),
    };

    this.paymentGuard.setPayment(summary);
    this.cart.clear();

    // 👉 Ahora sí, va al resumen final
    this.router.navigate(['/resumen']);
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
