import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-updated-modal',
  standalone: true,
  imports: [],
  templateUrl: './updated-modal.component.html',
  styleUrl: './updated-modal.component.scss'
})
export class UpdatedModalComponent {
  @Input() name?: string;
}
