import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Hotel } from '../../../hotels/models/hotel';
import { ManagerService } from '../../services/manager.service';
import { Room } from '../../../room/models/room';

@Component({
  selector: 'app-manager-hotel-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manager-hotel-details.component.html',
  styleUrl: './manager-hotel-details.component.scss'
})
export class ManagerHotelDetailsComponent implements OnInit {
  hotels?: Hotel[];
  rooms: any;

  constructor(private managerService: ManagerService, private router: Router) {

  }

  ngOnInit(): void {
    this.hotels = this.managerService.currentHotel;
  }

  addRoom(hotel: Hotel) {
    this.managerService.selectedHotel = hotel;
    this.router.navigate(["/manager-add-room-to-hotel"]);
  }

  roomDetailClick(room: Room) {
    this.managerService.selectedRoom = room;
    this.router.navigate(["/manager-hotel-room-detail"]);
  }
}
