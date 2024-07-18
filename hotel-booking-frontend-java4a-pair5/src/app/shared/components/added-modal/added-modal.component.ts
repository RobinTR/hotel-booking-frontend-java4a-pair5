import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-added-modal',
  standalone: true,
  imports: [],
  templateUrl: './added-modal.component.html',
  styleUrl: './added-modal.component.scss'
})
export class AddedModalComponent {
  @Input() name?: string;
}
