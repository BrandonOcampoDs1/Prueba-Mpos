import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() visible = false;
  @Input() title = 'Atención';
  @Input() message = '';
  @Input() onClose: () => void = () => {};

  close() {
    this.visible = false;
    this.onClose();
  }
}