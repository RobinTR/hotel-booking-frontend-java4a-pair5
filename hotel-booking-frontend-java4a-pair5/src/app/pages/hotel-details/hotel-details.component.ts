import { Component } from '@angular/core';
import { ReviewsComponent } from '../../features/hotels/components/reviews/reviews.component';
import { ArrowUpComponent } from '../../shared/components/arrow-up/arrow-up.component';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [ReviewsComponent, ArrowUpComponent],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.scss'
})
export class HotelDetailsComponent {

}
