import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ManagerService } from '../../services/manager.service';
import { ManagerAddRoomTypeService } from '../../services/manager-add-room-type.service';
import { ManagerAddRoomService } from '../../services/manager-add-room.service';
import { ManagerRoomType } from '../../models/manager-room-type';
import { ManagerAddRoomType } from '../../models/manager-add-room-type';
import { ManagerRoom } from '../../models/manager-room';
import { ManagerAddRoom } from '../../models/manager-add-room';
import { switchMap } from 'rxjs';
import { AddedModalComponent } from '../../../../shared/components/added-modal/added-modal.component';

declare var bootstrap: any;

@Component({
  selector: 'app-manager-add-room-to-hotel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddedModalComponent],
  templateUrl: './manager-add-room-to-hotel.component.html',
  styleUrl: './manager-add-room-to-hotel.component.scss'
})
export class ManagerAddRoomToHotelComponent {
  addRoomForm: FormGroup;

  constructor(private fb: FormBuilder, private managerService: ManagerService, private addRoomTypeService: ManagerAddRoomTypeService, private addRoomService: ManagerAddRoomService) {
    this.addRoomForm = this.fb.group({
      id: [null, Validators.required],
      number: [null, Validators.required],
      cost: [null, [Validators.required, Validators.min(0)]],
      name: ['', Validators.required],
      description: [''],
      capacity: [null, Validators.required]
    });
  }

  onSubmit() {
    this.addRoomForm.patchValue({
      id: this.managerService.selectedHotel?.id
    });

    if (this.addRoomForm.valid) {
      let roomTypeToAdd: ManagerAddRoomType = {
        name: this.addRoomForm.value.name,
        description: this.addRoomForm.value.description,
        capacity: this.addRoomForm.value.capacity
      };

      this.addRoomTypeService.add(roomTypeToAdd).pipe(
        switchMap((addedRoomType: ManagerRoomType) => {
          const roomToAdd: ManagerAddRoom = {
            roomTypeId: addedRoomType.id,
            cost: this.addRoomForm.value.cost,
            number: this.addRoomForm.value.number,
            hotelId: this.managerService.selectedHotel?.id
          };

          console.log(roomToAdd.cost);
          console.log(roomToAdd.number);
          return this.addRoomService.add(roomToAdd);
        })
      ).subscribe(
        (response: ManagerRoom) => {
          console.log("Room Added.");
          const successModal = new bootstrap.Modal(document.getElementById('successModal'));
          successModal.show();
          this.addRoomForm.reset();
        },
        (error: any) => {
          console.error('Manager Room Add error', error);
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }

  get number() { return this.addRoomForm.get('number'); }
  get cost() { return this.addRoomForm.get('cost'); }
  get name() { return this.addRoomForm.get('name'); }
  get description() { return this.addRoomForm.get('description'); }
  get capacity() { return this.addRoomForm.get('capacity'); }
}
