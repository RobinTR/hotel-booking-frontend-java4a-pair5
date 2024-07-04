import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../../../../shared/components/layout/layout.component';
import { HotelListComponent } from '../../../hotels/components/hotel-list/hotel-list.component';
import { ArrowUpComponent } from '../../../../shared/components/arrow-up/arrow-up.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FiltersComponent } from '../filters/filters.component';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-homepage',
  standalone: true,
  providers: [provideNativeDateAdapter(), DatePipe],
  imports: [LayoutComponent, CommonModule, RouterModule, HotelListComponent, ArrowUpComponent, PaginationComponent, FormsModule, ReactiveFormsModule, FiltersComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent implements OnInit {
  isOldUser: boolean = false;
  location!: string;
  person!: number;
  selectedStartDate: string | null = null;
  selectedEndDate: string | null = null;
  searchFormGroup!: FormGroup;

  constructor(formBuilder: FormBuilder, private change: ChangeDetectorRef, @Inject(DOCUMENT) private document: Document) {
    this.searchFormGroup = formBuilder.group({
      location: [''],
      startDate: [''],
      endDate: [''],
      person: ['']
    });
  }

  ngOnInit(): void {
    this.detectNewUser();
  }

  searchHotels() {
    this.location = this.searchFormGroup.value.location;
  }

  searchByPerson() {
    this.person = this.searchFormGroup.value.person;
  }

  searchByDate() {
    this.selectedStartDate = this.searchFormGroup.value.startDate;
    this.selectedEndDate = this.searchFormGroup.value.endDate;
  }

  detectNewUser() {
    let isOldUser = Boolean(
      this.document.defaultView?.localStorage?.getItem('oldUser')
    );

    if (!isOldUser) {
      this.document.defaultView?.localStorage?.setItem('oldUser', 'true');
      return;
    }
    
    setTimeout(() => {
      this.isOldUser = isOldUser;
      this.change.markForCheck();
    }, 1000);
  }

}
