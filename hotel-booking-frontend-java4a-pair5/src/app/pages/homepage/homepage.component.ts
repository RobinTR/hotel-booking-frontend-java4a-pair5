import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { HotelListComponent } from '../../features/hotels/components/hotel-list/hotel-list.component';
import { ArrowUpComponent } from '../../shared/components/arrow-up/arrow-up.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [LayoutComponent, CommonModule, RouterModule, HotelListComponent, ArrowUpComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'
  ]
})
export class HomepageComponent {

}
