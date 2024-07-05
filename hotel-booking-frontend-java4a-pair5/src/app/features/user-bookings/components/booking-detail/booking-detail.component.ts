import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GetBookingByUserIdResponse } from '../../models/get-booking-by-user-id';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserBookingService } from '../../services/user-booking.service';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.scss'
})
export class BookingDetailComponent implements OnInit {
  booking?: GetBookingByUserIdResponse;

  constructor(private userBookingService: UserBookingService) {

  }

  ngOnInit(): void {
    this.booking = this.userBookingService.booking;
  }
}
