import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { HotelFeature } from '../../../hotels/models/hotel-feature';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-feature',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-feature.component.html',
  styleUrl: './hotel-feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelFeatureComponent {
  @Input() hotelFeature?: HotelFeature;
}
