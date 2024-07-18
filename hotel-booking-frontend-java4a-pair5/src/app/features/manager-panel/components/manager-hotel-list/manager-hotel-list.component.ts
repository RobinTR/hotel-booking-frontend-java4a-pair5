import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../../hotels/models/hotel';
import { CommonModule } from '@angular/common';
import { ManagerService } from '../../services/manager.service';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manager-hotel-list.component.html',
  styleUrl: './manager-hotel-list.component.scss'
})
export class ManagerHotelListComponent implements OnInit {
  managerHotels: Hotel[] = [];
  managerId?: number | null;

  constructor(private managerService: ManagerService, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.managerId = this.authService.managerId;

    if (this.managerId != null) {
      this.searchHotelsByManager();
    }
  }

  searchHotelsByManager() {
    this.managerService.getHotelsOfManager(this.managerId!)
      .subscribe({
        next: (managerHotels) => {
          this.managerHotels = managerHotels;
          this.managerService.currentHotel = managerHotels;
        },
        error: (error) => {
          console.error('There was an error searching hotels by !', error);
        },
      });
  }
}
