import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelFeatureComponent } from './hotel-feature.component';

describe('HotelFeatureComponent', () => {
  let component: HotelFeatureComponent;
  let fixture: ComponentFixture<HotelFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
