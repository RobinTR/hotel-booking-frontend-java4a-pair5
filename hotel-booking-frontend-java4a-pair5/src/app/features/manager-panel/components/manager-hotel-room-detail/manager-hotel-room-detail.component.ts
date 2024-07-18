import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ManagerService } from '../../services/manager.service';
import { ManagerRoomUpdateService } from '../../services/manager-room-update.service';
import { ManagerRoom } from '../../models/manager-room';
import { ManagerRoomType } from '../../models/manager-room-type';
import { ManagerRoomTypeUpdateService } from '../../services/manager-room-type-update.service';
import { UpdatedModalComponent } from '../../../../shared/components/updated-modal/updated-modal.component';

declare var bootstrap: any;

@Component({
  selector: 'app-manager-hotel-room-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UpdatedModalComponent],
  templateUrl: './manager-hotel-room-detail.component.html',
  styleUrl: './manager-hotel-room-detail.component.scss'
})
export class ManagerHotelRoomDetailComponent implements OnInit {
  roomForm: FormGroup;
  initialName?: String;
  initialNumber?: number;
  initialCost?: number;
  initialDescription?: String;
  initialCapacity?: number;

  constructor(private fb: FormBuilder, private managerService: ManagerService, private managerRoomUpdateService: ManagerRoomUpdateService, private managerRoomTypeUpdateService: ManagerRoomTypeUpdateService, private location: Location) {
    this.roomForm = this.fb.group({
      name: [''],
      number: [''],
      cost: [''],
      description: [''],
      capacity: ['']
    });
  }

  ngOnInit(): void {
    if (this.managerService.selectedRoom) {
      this.initialName = this.managerService.selectedRoom.roomType.name;
      this.initialNumber = this.managerService.selectedRoom.number;
      this.initialCost = this.managerService.selectedRoom.cost;
      this.initialDescription = this.managerService.selectedRoom.roomType.description;
      this.initialCapacity = this.managerService.selectedRoom.roomType.capacity;

      this.roomForm.patchValue({
        name: this.initialName,
        number: this.initialNumber,
        cost: this.initialCost,
        description: this.initialDescription,
        capacity: this.initialCapacity
      });
    }
  }

  updateRoom() {
    if (this.roomForm.valid) {
      if (this.initialNumber != this.roomForm.value.number || this.initialCost != this.roomForm.value.cost) {
        let managerRoom: ManagerRoom = {
          id: this.managerService.selectedRoom?.id,
          hotelId: this.managerService.currentHotel?.at(0)?.id,
          roomTypeId: this.managerService.selectedRoom?.roomType.id,
          number: this.roomForm.value.number,
          cost: this.roomForm.value.cost
        }

        this.managerRoomUpdateService.update(managerRoom).subscribe(
          (response: ManagerRoom) => {
            this.refreshPage();
          },
          (error: any) => {
            console.error('Manager Room Update error', error);
          }
        );
      }

      if (this.initialName != this.roomForm.value.name || this.initialDescription != this.roomForm.value.description || this.initialCapacity != this.roomForm.value.capacity) {
        let managerRoomType: ManagerRoomType = {
          id: this.managerService.selectedRoom?.roomType.id,
          name: this.roomForm.value.name,
          description: this.roomForm.value.description,
          capacity: this.roomForm.value.capacity
        };

        this.managerRoomTypeUpdateService.update(managerRoomType).subscribe(
          (response: ManagerRoomType) => {
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();
            this.refreshPage();
          },
          (error: any) => {
            console.error('Manager Room Type Update error', error);
          }
        );
      }
    }
  }

  refreshPage() {
    this.location.go(this.location.path());
  }

}
