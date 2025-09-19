import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'funds-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './funds-modal.component.html',
  styleUrls: ['./funds-modal.component.css'],
})
export class FundsModalComponent {
  @Input() visible = false;
  @Input() title = '';
  @Input() action: 'add' | 'remove' = 'add';
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<number>();

  amount: number = 0;

  submit() {
    if (this.amount > 0) {
      this.confirm.emit(this.amount);
      this.amount = 0;
      this.visible = false;
    }
  }

  cancel() {
    this.amount = 0;
    this.visible = false;
    this.close.emit();
  }
}
