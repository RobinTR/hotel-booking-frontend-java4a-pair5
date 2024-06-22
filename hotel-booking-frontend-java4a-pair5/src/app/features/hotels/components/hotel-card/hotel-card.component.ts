import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-card.component.html',
  styleUrl: './hotel-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class HotelCardComponent {
  @Input() hotelRoomCost?: number;
  @Input() hotelName?: String;
  @Input() hotelDescription?: String;
  @Input() hotelStars?: number;
}
