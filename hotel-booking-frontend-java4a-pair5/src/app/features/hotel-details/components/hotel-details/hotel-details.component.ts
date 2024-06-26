import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReviewsComponent } from '../../../hotels/components/reviews/reviews.component';
import { ArrowUpComponent } from '../../../../shared/components/arrow-up/arrow-up.component';
import { CommonModule } from '@angular/common';
import { Hotel } from '../../../hotels/models/hotel';
import { HotelsService } from '../../../hotels/services/hotels.service';
import { HotelFeatureComponent } from '../hotel-feature/hotel-feature.component';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [ReviewsComponent, ArrowUpComponent, CommonModule, HotelFeatureComponent],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelDetailsComponent implements OnInit, OnChanges {
  selectedHotel?: Hotel;

  constructor(private hotelsService: HotelsService, private change: ChangeDetectorRef) {
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.change.markForCheck;
  }

  ngOnInit() {
    const hotel = this.hotelsService.getSelectedHotel();

    if (hotel) {
      this.selectedHotel = hotel;

      for (let index = 0; index < hotel!.hotelFeatures.length; index++) {
        console.log(hotel?.hotelFeatures[index]);
    }
    }
  }
}
