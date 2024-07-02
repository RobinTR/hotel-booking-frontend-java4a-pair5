import { ChangeDetectorRef, Component, OnInit, Output } from '@angular/core';
import { ReviewsComponent } from '../../../hotels/components/reviews/reviews.component';
import { ArrowUpComponent } from '../../../../shared/components/arrow-up/arrow-up.component';
import { CommonModule } from '@angular/common';
import { Hotel } from '../../../hotels/models/hotel';
import { HotelsService } from '../../../hotels/services/hotels.service';
import { HotelFeatureComponent } from '../hotel-feature/hotel-feature.component';
import { RouterModule } from '@angular/router';
import { HotelFeatureForModalComponent } from '../hotel-feature/hotel-feature-for-modal/hotel-feature-for-modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotelDetailsListComponent } from '../hotel-details-list/hotel-details-list.component';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [ReviewsComponent, ArrowUpComponent, CommonModule, HotelFeatureComponent, RouterModule, HotelFeatureForModalComponent, ReactiveFormsModule, HotelDetailsListComponent],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.scss'
})
export class HotelDetailsComponent implements OnInit {
  selectedHotel?: Hotel | null;
  filterForm: FormGroup;
  previousFormValues: any;
  location?: String;
  checkIn?: String;
  checkOut?: String;
  roomCapacity?: String;
  isSubmitted = false;

  constructor(private hotelsService: HotelsService, private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.filterForm = this.fb.group({
      location: [''],
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      roomCapacity: [''],
    });
  }

  ngOnInit() {
    this.selectedHotel = this.hotelsService.selectedHotel;
  }

  onFilterFormSubmit() {
    const currentFormValues = this.filterForm.value;

    if (!this.filterForm.valid) alert('Please fill in the Check-in and Check-out dates.');

    if (JSON.stringify(this.previousFormValues) !== JSON.stringify(currentFormValues)) {
      this.hotelsService.searchByRoomFilters(
        this.selectedHotel!.id,
        this.filterForm.value.checkIn,
        this.filterForm.value.checkOut,
        this.filterForm.value.roomCapacity
      ).subscribe(
        (hotel: Hotel | undefined) => {
          this.hotelsService.selectedHotel = hotel!;
          this.selectedHotel = hotel;
          console.log(this.filterForm.value.checkIn);
        },
        (error) => {
          console.error('Error fetching hotel:', error);
        }
      );
    }

    this.previousFormValues = currentFormValues;
  }

}
