import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PaymentGuard } from '../../core/guards/payment.guard';
import { UserStore } from '../../core/user.store';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-purchase-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchase-summary.component.html',
  styleUrls: ['./purchase-summary.component.css'],
})
export class PurchaseSummaryComponent implements OnInit {
  summary: any;

  constructor(
    private paymentGuard: PaymentGuard,
    private router: Router,
    private user: UserStore
  ) {}

  ngOnInit() {
    this.summary = this.paymentGuard.getSummary();
    if (!this.summary) {
      this.router.navigate(['/']);
      return;
    }
  }

  volver() {
    this.paymentGuard.clear();
    this.router.navigate(['/']);
  }

  exportarPDF() {
    const doc = new jsPDF();

    // === Logo ===
    doc.addImage('assets/logo.png', 'PNG', 150, 10, 40, 20);

    // === Título ===
    doc.setFontSize(20);
    doc.setTextColor(253, 93, 0); // naranja
    doc.text('Resumen de compra', 20, 25);

    // Línea separadora
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 30, 190, 30);

    // === Datos del cliente ===
    doc.setFontSize(12);
    doc.setTextColor(40);
    const total = Number(this.summary.total) || 0;

    doc.text(`Cliente: ${this.summary.name}`, 20, 45);
    doc.text(`Monto pagado: $${total.toFixed(2)}`, 20, 55);

    // === Productos ===
    doc.setFontSize(14);
    doc.setTextColor(0, 122, 204); // azul suave
    doc.text('Productos:', 20, 70);

    doc.setFontSize(12);
    doc.setTextColor(40);

    let y = 80;
    let totalItems = 0;
    this.summary.items.forEach((item: any) => {
      const price = Number(item.product.price) || 0;
      const qty = Number(item.product.quantity) || 0;
      const subtotal = price * qty;

      totalItems += qty;

      doc.text(
        `- ${item.product.title} | $${price.toFixed(2)}`,
        25,
        y
      );
      y += 8;
    });

    // Línea final
    doc.setDrawColor(220, 220, 220);
    doc.line(20, y + 5, 190, y + 5);

    // === Totales ===
    y += 15;
    doc.setFontSize(13);
    doc.setTextColor(20);
    y += 8;
    doc.text(`Total pagado: $${total.toFixed(2)}`, 20, y);

    // === Mensaje final ===
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(
      'Si llegaste hasta este punto del desarrollo soy Brandon y me encantan\n' +
        'incursionarme en los pequeños detalles sin dejar escapar nada y siempre\n' +
        'tratando de mejorar al 100%.',
      20,
      y + 20
    );

    // Guardar
    doc.save('resumen_compra.pdf');
  }
}
