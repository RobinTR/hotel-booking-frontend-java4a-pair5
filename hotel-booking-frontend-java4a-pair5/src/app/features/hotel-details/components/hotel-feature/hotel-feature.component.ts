import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelFeature } from '../../../hotels/models/hotel-feature';

@Component({
  selector: 'app-hotel-feature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-feature.component.html',
  styleUrl: './hotel-feature.component.scss'
})
export class HotelFeatureComponent {
  @Input() hotelFeature?: HotelFeature;
}
