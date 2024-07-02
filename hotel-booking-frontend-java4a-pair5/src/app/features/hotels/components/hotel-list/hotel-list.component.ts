import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { HotelsService } from '../../services/hotels.service';
import { CommonModule } from '@angular/common';
import { PaginatedList } from '../../../../core/models/paginated-list';
import { HotelCardComponent } from '../hotel-card/hotel-card.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { Hotel } from '../../models/hotel';
import {  FiltersComponent } from '../../../homepage/components/filters/filters.component';


@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [CommonModule, HotelCardComponent, PaginationComponent,FiltersComponent],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelListComponent implements OnInit, OnChanges {
  sortedHotelList: Hotel[] = [];
  filteredHotelList: Hotel[] = [];
  hotelList: PaginatedList<Hotel>={
    items: [],
    pageIndex: 0,
    pageSize: 0,
    totalCount: 0
  }
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
      this.searchHotelsByDate();
      
  
    }else if(this.person){
      this.searchHotelsByPerson();
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
      
      this.hotelsService.searchByDate(this.startDate!,this.endDate!)
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
  sortBy(criteria: string) {
    if (!this.hotelList || !this.hotelList.items) {
      console.error('Hotel list or items are not defined.');
      return;
    }
  
    switch (criteria) {
      case 'priceLow':
        this.sortedHotelList = this.sortByPriceLow();
        break;
      case 'priceHigh':
        this.sortedHotelList = this.sortByPriceHigh();
        break;
      case 'starRating':
        this.sortedHotelList = this.sortByStarRating();
        break;
      default:
        this.sortedHotelList = this.hotelList.items.slice(); // Varsayılan olarak herhangi bir sıralama yapma
        break;
    }
    this.change.detectChanges();
  }
  
  sortByPriceLow(): any[] {
    if (!this.hotelList || !this.hotelList.items) {
      return [];
    }
  
    return this.hotelList.items.sort((a, b) => {
      const lowestPriceA = this.getLowestRoomPrice(a);
      const lowestPriceB = this.getLowestRoomPrice(b);
      return lowestPriceA - lowestPriceB;
    });
  }
  
  sortByPriceHigh(): any[] {
    if (!this.hotelList || !this.hotelList.items) {
      return [];
    }
  
    return this.hotelList.items.sort((a, b) => {
      const highestPriceA = this.getHighestRoomPrice(a);
      const highestPriceB = this.getHighestRoomPrice(b);
      return highestPriceB - highestPriceA;
    });
  }
  
  sortByStarRating(): any[] {
    if (!this.hotelList || !this.hotelList.items) {
      return [];
    }
  
    return this.hotelList.items.sort((a, b) => b.starRating - a.starRating);
  }
  
  getLowestRoomPrice(hotel: any): number {
    if (hotel.rooms && hotel.rooms.length > 0) {
      return hotel.rooms.reduce((minPrice: number, room: any) => Math.min(minPrice, room.cost), Infinity);
    }
    return Infinity;
  }
  
  getHighestRoomPrice(hotel: any): number {
    if (hotel.rooms && hotel.rooms.length > 0) {
      return hotel.rooms.reduce((maxPrice: number, room: any) => Math.max(maxPrice, room.cost), -Infinity);
    }
    return -Infinity;
  }
  onFilterChanged(filters: { minPrice: number, maxPrice: number, featureIds: number[] }): void {
    if (!this.hotelList || !this.hotelList.items) {
      console.error('Hotel list or items are not defined.');
      return;
    }
    this.hotelsService.searchHotelsByFilters(filters.minPrice, filters.maxPrice, filters.featureIds)
      .subscribe({
        next: (hotelList) => {
          this.hotelList = hotelList;
        },
        error: (error) => {
          console.error('Error applying filters:', error);
        }
      });
  }

}
