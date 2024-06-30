import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Hotel } from '../../../hotels/models/hotel';
import { CommonModule } from '@angular/common';
import { HotelFeatureComponent } from '../hotel-feature/hotel-feature.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Room } from '../../../room/models/room';
import { HotelsService } from '../../../hotels/services/hotels.service';
import { HotelDetailsService } from '../../services/hotel-details.service';
import { Router } from '@angular/router';
import { HotelFeatureForModalComponent } from '../hotel-feature/hotel-feature-for-modal/hotel-feature-for-modal.component';

@Component({
  selector: 'app-hotel-details-list',
  standalone: true,
  imports: [CommonModule, HotelFeatureComponent, ReactiveFormsModule, HotelFeatureForModalComponent],
  templateUrl: './hotel-details-list.component.html',
  styleUrl: './hotel-details-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HotelDetailsListComponent implements AfterViewInit, OnChanges {
  @Input() selectedHotel?: Hotel | null;
  selectedRoom?: Room;
  @ViewChild('carouselIndicators') carouselIndicators?: ElementRef;
  @ViewChild('carouselModalIndicators') carouselModalIndicators?: ElementRef;

  constructor(private renderer: Renderer2,private hotelsService: HotelsService, private hotelDetailsService: HotelDetailsService, private router: Router) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(JSON.stringify(this.selectedHotel) + " onChange");
    console.log(this.selectedHotel as unknown as Hotel[]);

    /*if (changes['selectedHotel']) {
      // Handle changes to selectedHotel here
      if (!changes['selectedHotel'].firstChange) {
        this.setupCarouselIndicators();
      }
    }*/
    if (changes['selectedRoom']) {
      // Handle changes to selectedRoom here
      if (!changes['selectedRoom'].firstChange) {
        this.setupCarouselForModalIndicators();
      }
    }
  }

  ngAfterViewInit(): void {
    this.setupCarouselIndicators();
  }

  selectRoom(room: Room) {
    this.selectedRoom = room;
    this.setupCarouselForModalIndicators();
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

  private setupCarouselForModalIndicators() {
    this.renderer.setProperty(this.carouselModalIndicators?.nativeElement, 'innerHTML', '');

    this.selectedRoom?.imageUrls.forEach((imageUrl, index) => {
      const button = this.renderer.createElement('button');
      this.renderer.setAttribute(button, 'type', 'button');
      this.renderer.setAttribute(button, 'data-bs-target', '#carouselModalIndicators');
      this.renderer.setAttribute(button, 'data-bs-slide-to', index.toString());
      this.renderer.setAttribute(button, 'aria-label', `Slide ${index + 1}`);

      if (index === 0) {
        this.renderer.addClass(button, 'active');
        this.renderer.setAttribute(button, 'aria-current', 'true');
      }

      this.renderer.appendChild(this.carouselModalIndicators?.nativeElement, button);
    });
  }
}
