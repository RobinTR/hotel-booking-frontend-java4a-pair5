import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Hotel } from '../../models/hotel';
import { Router } from '@angular/router';
import { HotelsService } from '../../services/hotels.service';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-card.component.html',
  styleUrl: './hotel-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class HotelCardComponent {
  @Input() hotelName?: String;
  @Input() hotelDescription?: String;
  @Input() hotelStars?: number;
  @Input() hotelData!: Hotel;

  constructor(private hotelsService: HotelsService, private router: Router) {

  }

  bookNow() {
    this.hotelsService.setSelectedHotel(this.hotelData);
    this.router.navigate(['/hoteldetails']);
  }
}
