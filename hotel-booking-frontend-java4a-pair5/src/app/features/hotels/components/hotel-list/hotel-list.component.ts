import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { HotelListItem } from '../../models/hotel-list-item';
import { HotelsService } from '../../services/hotels.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HotelCardComponent } from '../hotel-card/hotel-card.component';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [CommonModule, HotelCardComponent],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelListComponent implements OnInit {
  hotelList!: HotelListItem[];

  constructor(private hotelsService: HotelsService, private change: ChangeDetectorRef) {
    
  }

  ngOnInit(): void {
    this.getHotelList();
  }

  getHotelList() {
    this.hotelsService
      .getList()
      .subscribe({
        next: (hotelList) => {
          console.log(hotelList);
          this.hotelList = hotelList;
          this.change.markForCheck();
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  trackByHotelId(index: number, hotel: HotelListItem): number {
    return hotel.id;
  }
}
