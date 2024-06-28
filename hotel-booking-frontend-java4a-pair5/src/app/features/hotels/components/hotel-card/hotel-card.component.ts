import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
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
export class HotelCardComponent implements OnInit {
  @Input() hotelName?: String;
  @Input() hotelDescription?: String;
  @Input() hotelStars?: number;
  @Input() hotelData!: Hotel;
  minCost?: number;

  constructor(private hotelsService: HotelsService, private router: Router) {

  }

  ngOnInit(): void {
    let min = 0;

    for (let i = 0; i < this.hotelData.rooms.length; i++) {
      if (this.hotelData.rooms[i].cost > min) {
        min = this.hotelData.rooms[i].cost;
      }
    };

    this.minCost = min;
  }

  bookNow() {
    this.hotelsService.setSelectedHotel(this.hotelData);
    this.router.navigate(['/hoteldetails']);
  }
}
