import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../../../../shared/components/layout/layout.component';
import { HotelListComponent } from '../../../hotels/components/hotel-list/hotel-list.component';
import { ArrowUpComponent } from '../../../../shared/components/arrow-up/arrow-up.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltersComponent } from '../filters/filters.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerControl, MatDatepickerInputEvent, MatDatepickerModule, MatDatepickerPanel } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-homepage',
  standalone: true,
  providers:[ provideNativeDateAdapter(),DatePipe],
  imports: [LayoutComponent, CommonModule, RouterModule, HotelListComponent, ArrowUpComponent, PaginationComponent, FormsModule, ReactiveFormsModule,FiltersComponent,MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatNativeDateModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent {

  location!: string;
  person!:number;

  selectedStartDate: string | null = null;
  selectedEndDate: string | null = null;
  searchFormGroup!: FormGroup;
  constructor(formBuilder: FormBuilder,private datePipe:DatePipe) {
    this.searchFormGroup = formBuilder.group({
      location: [''],
      startDate:[''],
      endDate:[''],
      person:['']
    });
  }

  searchHotels() {
    this.location = this.searchFormGroup.value.location;
  }

 
    searchByPerson(){
      this.person = this.searchFormGroup.value.person;

    }
    

    // Method to handle date selection
    onStartDateSelected(event: MatDatepickerInputEvent<Date>) {
      this.selectedStartDate = this.datePipe.transform(event.value, 'yyyy-MM-dd') || '';
      console.log('Selected date:', this.selectedStartDate);
      
    }

    onEndDateSelected(event: MatDatepickerInputEvent<Date>) {
      this.selectedEndDate = this.datePipe.transform(event.value, 'yyyy-MM-dd') || '';
      console.log('Selected date:', this.selectedEndDate);
      
    }
}
