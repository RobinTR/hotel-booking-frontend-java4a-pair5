import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  confirmAction() {
    this.confirm.emit();
    const closeButton = document.querySelector('#confirmModal .btn-close') as HTMLElement;
    if (closeButton) {
      closeButton.click();
    }
  }

  cancelAction() {
    this.cancel.emit();
  }
}
