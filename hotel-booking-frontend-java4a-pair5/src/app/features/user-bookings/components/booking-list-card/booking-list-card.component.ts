import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BookingDetailComponent } from '../booking-detail/booking-detail.component';
import { GetBookingByUserIdResponse } from '../../models/get-booking-by-user-id';
import { UserBookingService } from '../../services/user-booking.service';

@Component({
  selector: 'app-booking-list-card',
  standalone: true,
  imports: [CommonModule, BookingDetailComponent, RouterModule],
  templateUrl: './booking-list-card.component.html',
  styleUrl: './booking-list-card.component.scss'
})
export class BookingListCardComponent {
  @Input() booking?: GetBookingByUserIdResponse;

  constructor(private userBookingService: UserBookingService) {

  }

  bookingDetailClick() {
    this.userBookingService.booking = this.booking;
  }
}
