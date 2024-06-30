import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteringComponent } from './filtering.component';

describe('FilteringComponent', () => {
  let component: FilteringComponent;
  let fixture: ComponentFixture<FilteringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilteringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilteringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
