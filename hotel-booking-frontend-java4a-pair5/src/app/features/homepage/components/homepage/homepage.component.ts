import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../../../../shared/components/layout/layout.component'; 
import { HotelListComponent } from '../../../hotels/components/hotel-list/hotel-list.component';
import { ArrowUpComponent } from '../../../../shared/components/arrow-up/arrow-up.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotelsService } from '../../../hotels/services/hotels.service';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [LayoutComponent, CommonModule, RouterModule, HotelListComponent, ArrowUpComponent, PaginationComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'
  ]
})
export class HomepageComponent {
  location!: string;
  locationFormGroup!: FormGroup;
  constructor(formBuilder: FormBuilder, private hotelService:HotelsService){
    this.locationFormGroup= formBuilder.group({
    location: ['']
        
});
}


  searchHotels() {
    this.location=this.locationFormGroup.value.location;
      if (this.location) {
        
       this.hotelService.searchByLocation(this.location).subscribe();
      } else {
          console.warn('Location input is empty!');
      }
  }

}
