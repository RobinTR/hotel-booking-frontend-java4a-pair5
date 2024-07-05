import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BookingListCardComponent } from '../booking-list-card/booking-list-card.component';
import { UserBookingService } from '../../services/user-booking.service';
import { GetBookingByUserIdResponse } from '../../models/get-booking-by-user-id';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule, BookingListCardComponent],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.scss'
})
export class BookingListComponent implements OnInit {
  bookings?: GetBookingByUserIdResponse[];
  
  constructor(private userBookingService: UserBookingService) {

  }

  ngOnInit(): void {
    let userId = this.userBookingService.getCurrentUserId();

    this.userBookingService.getUserBookingsById(userId!).subscribe(
      (data) => {
        this.bookings = data;
      },
      (error) => {
        console.error('Error fetching user bookings:', error);
      }
    );
  }
}
