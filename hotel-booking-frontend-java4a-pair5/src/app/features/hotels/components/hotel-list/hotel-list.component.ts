import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HotelListItem } from '../../models/hotel-list-item';
import { HotelsService } from '../../services/hotels.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PaginatedList } from '../../../../core/models/paginated-list';
import { HotelCardComponent } from '../hotel-card/hotel-card.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [CommonModule, HotelCardComponent, PaginationComponent],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelListComponent implements OnInit, OnChanges {
  hotelList!: PaginatedList<HotelListItem>;

  @Input() initialPageIndex: number = 0;
  @Output() changePage = new EventEmitter<number>();

  constructor(private hotelsService: HotelsService, private change: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.getHotelList(this.initialPageIndex, 9);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getHotelList(0, 9);
  }

  getHotelList(pageIndex: number, pageSize: number) {
    this.hotelsService
      .getList(pageIndex, pageSize)
      .subscribe({
        next: (hotelList) => {
          this.hotelList = hotelList;
          this.change.markForCheck();
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  onChangePage(requestedPageIndex: number) {
    this.getHotelList(requestedPageIndex, this.hotelList.pageSize);
    this.changePage.emit(requestedPageIndex);
  }
}
