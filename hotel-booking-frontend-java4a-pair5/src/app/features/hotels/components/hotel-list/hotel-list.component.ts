import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HotelsService } from '../../services/hotels.service';
import { CommonModule } from '@angular/common';
import { PaginatedList } from '../../../../core/models/paginated-list';
import { HotelCardComponent } from '../hotel-card/hotel-card.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { Hotel } from '../../models/hotel';
import { log } from 'console';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [CommonModule, HotelCardComponent, PaginationComponent],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelListComponent implements OnInit, OnChanges {
  hotelList!: PaginatedList<Hotel>;
  @Input() location: string = '';
  @Input() startDate!: string;
  @Input() endDate!:string;
  @Input() person!:number;
  @Input() filterByHotelId: number | null = null;
  @Input() initialPageIndex: number = 0;
  @Output() changePage = new EventEmitter<number>();

  constructor(private hotelsService: HotelsService, private change: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    if (this.location ) {
      this.searchHotelsByLocation()
      
    }else if(this.startDate && this.endDate){
      console.log(this.startDate,this.endDate);
      
       this.searchHotelsByDate();
    } 
    else if(this.person){
      this.searchHotelsByPerson();
   } 
    else {
      this.getHotelList(this.initialPageIndex, 9);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    /*if (
      changes['filterByHotelId'] &&
      changes['filterByHotelId'].previousValue !==
      changes['filterByHotelId'].currentValue
    )*/
    if (this.location ) {
    
      this.searchHotelsByLocation();

  
    }else if ( this.startDate && this.endDate) {
      console.log(this.startDate,this.endDate);
      this.searchHotelsByDate();
      
  
    }
     else {
      this.getHotelList(0, 9);
    }
  }

  getHotelList(pageIndex: number, pageSize: number) {
    this.hotelsService
      .getList(pageIndex, pageSize, this.filterByHotelId)
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

  searchHotelsByLocation() {
    if (this.location ) {
      this.hotelsService.searchByLocation(this.location) 
        .subscribe({
          next: (hotelList) => {
            this.hotelList = hotelList;
            this.change.markForCheck();
        
          },
          error: (error) => {
            console.error('There was an error searching hotels by location!', error);
          },
        });
    }
  }

  searchHotelsByDate() {
    if ( this.startDate && this.endDate) {
      console.log(this.startDate,this.endDate);
      
      this.hotelsService.searchByDate(this.startDate,this.endDate)
        .subscribe({
          next: (hotelList) => {
            this.hotelList = hotelList;  
            this.change.markForCheck();
        
          },
          error: (error) => {
            console.error('There was an error searching hotels by !', error);
          },
        });
    }
  }
  searchHotelsByPerson() {
    if ( this.person) {
      this.hotelsService.searchByPerson(this.person)
        .subscribe({
          next: (hotelList) => {
            
            this.hotelList = hotelList;
            this.change.markForCheck();
        
          },
          error: (error) => {
            console.error('There was an error searching hotels by location!', error);
          },
        });
    }
  }

  onChangePage(requestedPageIndex: number) {
    this.getHotelList(requestedPageIndex, this.hotelList.pageSize);
    this.changePage.emit(requestedPageIndex);
  }
}
