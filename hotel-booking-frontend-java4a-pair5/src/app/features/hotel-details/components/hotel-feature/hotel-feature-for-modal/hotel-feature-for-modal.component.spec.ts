import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelFeatureForModalComponent } from './hotel-feature-for-modal.component';

describe('HotelFeatureForModalComponent', () => {
  let component: HotelFeatureForModalComponent;
  let fixture: ComponentFixture<HotelFeatureForModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelFeatureForModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelFeatureForModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
