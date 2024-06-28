import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../../../../shared/components/layout/layout.component';
import { HotelListComponent } from '../../../hotels/components/hotel-list/hotel-list.component';
import { ArrowUpComponent } from '../../../../shared/components/arrow-up/arrow-up.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerControl, MatDatepickerInputEvent, MatDatepickerModule, MatDatepickerPanel } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';



@Component({
  selector: 'app-homepage',
  standalone: true,
  providers: provideNativeDateAdapter(),
  imports: [LayoutComponent, CommonModule, RouterModule, HotelListComponent, ArrowUpComponent, PaginationComponent, FormsModule, ReactiveFormsModule, MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatNativeDateModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'
  ]
})
export class HomepageComponent {
onDateSelected($event: MatDatepickerInputEvent<any,any>) {
throw new Error('Method not implemented.');
}
  location!: string;
  locationFormGroup!: FormGroup;
  picker2!: MatDatepickerPanel<MatDatepickerControl<any>,any,any>;
  

  constructor(formBuilder: FormBuilder) {
    this.locationFormGroup = formBuilder.group({
      location: ['']
    });
  }

  searchHotels() {
    this.location = this.locationFormGroup.value.location;
  }
}
