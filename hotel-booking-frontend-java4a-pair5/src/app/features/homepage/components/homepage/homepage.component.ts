import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../../../../shared/components/layout/layout.component'; 
import { HotelListComponent } from '../../../hotels/components/hotel-list/hotel-list.component';
import { ArrowUpComponent } from '../../../../shared/components/arrow-up/arrow-up.component';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [LayoutComponent, CommonModule, RouterModule, HotelListComponent, ArrowUpComponent, PaginationComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'
  ]
})
export class HomepageComponent {
  
}
