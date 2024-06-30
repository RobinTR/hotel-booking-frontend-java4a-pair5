import { Component, Input } from '@angular/core';
import { HotelFeature } from '../../../../hotels/models/hotel-feature';

@Component({
  selector: 'app-hotel-feature-for-modal',
  standalone: true,
  imports: [],
  templateUrl: './hotel-feature-for-modal.component.html',
  styleUrl: './hotel-feature-for-modal.component.scss'
})
export class HotelFeatureForModalComponent {
  @Input() hotelFeature?: HotelFeature;
}
