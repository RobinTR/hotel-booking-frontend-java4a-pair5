import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cancel-modal',
  standalone: true,
  imports: [],
  templateUrl: './cancel-modal.component.html',
  styleUrl: './cancel-modal.component.scss'
})
export class CancelModalComponent {
  @Output() abort = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  confirmAction() {
    this.abort.emit();
    const closeButton = document.querySelector('#cancelModal .btn-close') as HTMLElement;
    if (closeButton) {
      closeButton.click();
    }
  }

  cancelAction() {
    this.cancel.emit();
  }
}
