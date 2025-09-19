import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PaymentGuard implements CanActivate {
  private paymentDone = false;
  private summaryData: any = null;

  constructor(private router: Router) {}

  setPayment(data: any) {
    this.paymentDone = true;
    this.summaryData = data;
  }

  getSummary() {
    return this.summaryData;
  }

  clear() {
    this.paymentDone = false;
    this.summaryData = null;
  }

  canActivate(): boolean {
    if (this.paymentDone) {
      return true;
    }
    this.router.navigate(['/']); // si intenta entrar directo lo mando al home
    return false;
  }
}
