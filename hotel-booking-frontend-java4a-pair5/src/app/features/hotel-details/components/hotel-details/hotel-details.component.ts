import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { ReviewsComponent } from '../../../hotels/components/reviews/reviews.component';
import { ArrowUpComponent } from '../../../../shared/components/arrow-up/arrow-up.component';
import { CommonModule } from '@angular/common';
import { Hotel } from '../../../hotels/models/hotel';
import { HotelsService } from '../../../hotels/services/hotels.service';
import { HotelFeatureComponent } from '../hotel-feature/hotel-feature.component';
import { Router, RouterModule } from '@angular/router';
import { HotelDetailsService } from '../../services/hotel-details.service';
import { Room } from '../../../room/models/room';

@Component({
  selector: 'app-hotel-details',
  standalone: true,
  imports: [ReviewsComponent, ArrowUpComponent, CommonModule, HotelFeatureComponent, RouterModule],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelDetailsComponent implements OnInit, OnChanges, AfterViewInit {
  selectedHotel?: Hotel | null;
  @ViewChild('carouselIndicators') carouselIndicators?: ElementRef;

  constructor(private hotelsService: HotelsService, private hotelDetailsService: HotelDetailsService, private router: Router, private renderer: Renderer2) {

  }

  ngAfterViewInit(): void {
    this.setupCarouselIndicators();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedHotel = this.hotelsService.getSelectedHotel();
  }

  ngOnInit() {
    const hotel = this.hotelsService.getSelectedHotel();
    this.selectedHotel = this.hotelsService.getSelectedHotel();

    if (hotel) {
      this.selectedHotel = hotel;
    }
  }

  navigateToBooking(hotel: Hotel, room: Room) {
    this.hotelDetailsService.hotelData = hotel;
    this.hotelDetailsService.roomData = room;
    this.router.navigate(['/booking']);
  }

  private setupCarouselIndicators() {
    // carousel-indicators içindeki önceki düğmeleri temizle
    this.renderer.setProperty(this.carouselIndicators?.nativeElement, 'innerHTML', '');

    // hotelImageUrls üzerinde döngü yaparak düğmeleri oluştur
    this.selectedHotel?.hotelImageUrls.forEach((imageUrl, index) => {
      const button = this.renderer.createElement('button');
      this.renderer.setAttribute(button, 'type', 'button');
      this.renderer.setAttribute(button, 'data-bs-target', '#carouselExampleIndicators');
      this.renderer.setAttribute(button, 'data-bs-slide-to', index.toString());
      this.renderer.setAttribute(button, 'aria-label', `Slide ${index + 1}`);

      if (index === 0) {
        this.renderer.addClass(button, 'active');
        this.renderer.setAttribute(button, 'aria-current', 'true');
      }

      this.renderer.appendChild(this.carouselIndicators?.nativeElement, button);
    });
  }
}
