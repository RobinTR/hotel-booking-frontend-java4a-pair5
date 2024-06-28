import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../../hotels/models/hotel';
import { Room } from '../../../room/models/room';
import { HotelDetailsService } from '../../../hotel-details/services/hotel-details.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {
  bookingHotel?: Hotel;
  bookingRoom?: Room;

  constructor(private hotelDetailsService: HotelDetailsService) {

  }

  ngOnInit(): void {
    this.bookingHotel = this.hotelDetailsService.hotelData;
    this.bookingRoom = this.hotelDetailsService.roomData;
  }
}
