import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../../hotels/models/hotel';
import { Room } from '../../../room/models/room';
import { HotelDetailsService } from '../../../hotel-details/services/hotel-details.service';
import { FormArray, FormBuilder, FormGroup, Validators, FormGroupName, ReactiveFormsModule } from '@angular/forms';
import { Booking } from '../../models/booking';
import { Citizen } from '../../models/citizen';
import { BookingService } from '../../services/booking.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent implements OnInit {
  bookingHotel?: Hotel;
  bookingRoom?: Room;
  bookingForm: FormGroup;

  constructor(private bookingService: BookingService, private hotelDetailsService: HotelDetailsService, private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.bookingForm = this.fb.group({
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      checkIn: [{ value: '', disabled: true }],
      checkOut: [{ value: '', disabled: true }],
      numberOfPeople: [1, Validators.required],
      people: this.fb.array([])
    });

    this.onPeopleChange();
  }

  ngOnInit(): void {
    this.bookingHotel = this.hotelDetailsService.hotelData;
    this.bookingRoom = this.hotelDetailsService.roomData;
    this.setPeople(1);
    this.bookingForm.patchValue({
      checkIn: this.hotelDetailsService.checkIn,
      checkOut: this.hotelDetailsService.checkOut
    });
  }

  get people(): FormArray {
    return this.bookingForm.get('people') as FormArray;
  }

  onPeopleChange() {
    this.bookingForm.get('numberOfPeople')?.valueChanges.subscribe(count => {
      this.setPeople(count);
    });
  }

  setPeople(count: number) {
    const people = this.bookingForm.get('people') as FormArray;
    while (people.length < count) {
      people.push(this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        birthDate: ['', Validators.required]
      }));
    }
    while (people.length > count) {
      people.removeAt(people.length - 1);
    }
  }

  onSubmit() {
    if (this.bookingForm.invalid) {
      return;
    }

    const formValues = this.bookingForm.value;
    this.authService.guestId;
    console.log(this.authService.guestId);

    const citizens: Citizen[] = formValues.people.map((person: any) => ({
      firstName: person.firstName,
      lastName: person.lastName,
      birthDate: person.birthDate
    }));

    const booking: Booking = {
      hotelId: this.bookingHotel?.id || 0,
      guestId: this.authService.guestId!,
      citizens: citizens,
      roomIds: [this.bookingRoom?.id || 0],
      paymentMethodId: 1,
      startDate: this.getLocalDateOfString(this.hotelDetailsService.checkIn as string),
      endDate: this.getLocalDateOfString(this.hotelDetailsService.checkOut as string)
    };

    this.bookingService.makeReservation(booking).subscribe(
      (response: Booking) => {
        this.router.navigateByUrl('/user-bookings');
      },
      (error: any) => {
        console.error('Booking error', error);
        console.log(JSON.stringify(error));
      }
    );
  }

  getLocalDateOfString(date: string): string {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new Error('Invalid date format. Expected format: YYYY-MM-DD');
    }

    const stringDate = new Date(date);

    if (isNaN(stringDate.getTime())) {
      throw new Error('Invalid date value');
    }

    return stringDate.toISOString().substring(0, 10);
  }
}
