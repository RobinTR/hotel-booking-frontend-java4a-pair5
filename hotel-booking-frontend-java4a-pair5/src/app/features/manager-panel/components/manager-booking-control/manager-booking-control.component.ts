import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { GetBookingByManagerIdResponse } from '../../models/get-booking-by-manager-id';
import { CommonModule } from '@angular/common';
import { ManagerBookingService } from '../../services/manager-booking.service';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';
import { ReservationStatus } from '../../../reservation-status/models/reservation-status';
import { CancelModalComponent } from '../../../../shared/components/cancel-modal/cancel-modal.component';

@Component({
  selector: 'app-manager-booking-control',
  standalone: true,
  imports: [CommonModule, ConfirmModalComponent, CancelModalComponent],
  templateUrl: './manager-booking-control.component.html',
  styleUrl: './manager-booking-control.component.scss'
})
export class ManagerBookingControlComponent implements OnInit {
  bookings?: GetBookingByManagerIdResponse[];
  managerId?: number | null;
  isConfirmed: boolean = false;
  selectedBookingId?: number;

  constructor(private managerBookingService: ManagerBookingService, private authService: AuthService, private ref: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.managerId = this.authService.managerId;

    if (this.managerId != null) {
      this.setBooking();
    }
  }

  setBooking() {
    this.managerBookingService.getBookingsOfManager(this.managerId!)
      .subscribe({
        next: (bookings) => {
          this.bookings = bookings;
        },
        error: (error) => {
          console.error('There was an error searching reservations: ', error);
        },
      });
  }

  approveBooking(id: number): void {
    this.selectedBookingId = id;

    if (this.isConfirmed) {
      this.managerBookingService.patchReservationStatus(this.selectedBookingId, ReservationStatus.APPROVED).subscribe(
        (response: string) => {
          console.log(response);
          location.reload();
        },
        (error: any) => {
          console.error('Reservation Status Update Error!', error);
        }
      );
    }
  }

  cancelBooking(id: number): void {
    this.selectedBookingId = id;

    if (this.isConfirmed) {
      this.managerBookingService.patchReservationStatus(this.selectedBookingId, ReservationStatus.ABORTED).subscribe(
        (response: string) => {
          console.log(response);
          location.reload();
        },
        (error: any) => {
          console.error('Reservation Status Update Error!', error);
        }
      );
    }
  }

  onConfirm() {
    this.isConfirmed = true;
    this.approveBooking(this.selectedBookingId!);
  }

  onAbort() {
    this.isConfirmed = true;
    this.cancelBooking(this.selectedBookingId!);
  }

  onCancel() {
    this.isConfirmed = false;
  }
}
