import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManagerService } from '../../services/manager.service';
import { AddHotel } from '../../models/add-hotel';
import { Router, RouterModule } from '@angular/router';
import { AddedModalComponent } from '../../../../shared/components/added-modal/added-modal.component';

declare var bootstrap: any;

@Component({
  selector: 'app-hotel-add-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, AddedModalComponent],
  templateUrl: './manager-add-hotel.component.html',
  styleUrl: './manager-add-hotel.component.scss'
})
export class HotelAddFormComponent {
  hotelForm: FormGroup;

  constructor(private fb: FormBuilder, private managerService: ManagerService, private router: Router) {
    this.hotelForm = this.fb.group({
      fullAddress: ['', Validators.required],
      name: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      website: [''],
      description: [''],
      floorCount: [null, Validators.required],
      starRating: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.hotelForm.valid) {
      const newHotel: AddHotel = this.hotelForm.value;

      this.managerService.add(newHotel).subscribe(
        (response: AddHotel) => {
          const successModal = new bootstrap.Modal(document.getElementById('successModal'));
          successModal.show();
          this.hotelForm.reset();
        },
        (error: any) => {
          console.error('Hotel Adding error', error);
        }
      );
      
    } else {
      console.log('Form is not valid');
    }
  }
}
