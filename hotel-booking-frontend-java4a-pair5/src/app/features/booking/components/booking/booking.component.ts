import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../../hotels/models/hotel';
import { Room } from '../../../room/models/room';
import { HotelDetailsService } from '../../../hotel-details/services/hotel-details.service';
import { FormArray, FormBuilder, FormGroup, Validators, FormGroupName, ReactiveFormsModule } from '@angular/forms';

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

  constructor(private hotelDetailsService: HotelDetailsService, private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      checkin: [{value: '', disabled: true}],
      checkout: [{value: '', disabled: true}],
      numberOfPeople: [1, Validators.required],
      people: this.fb.array([])
    });

    this.onPeopleChange();
  }

  ngOnInit(): void {
    this.bookingHotel = this.hotelDetailsService.hotelData;
    this.bookingRoom = this.hotelDetailsService.roomData;
    this.setPeople(1);
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
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        birth_date: ['', Validators.required]
      }));
    }
    while (people.length > count) {
      people.removeAt(people.length - 1);
    }
  }

  onSubmit() {
    console.log(this.bookingForm.value);
  }
}
