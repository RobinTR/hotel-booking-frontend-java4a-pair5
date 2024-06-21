import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowUpComponent } from './arrow-up.component';

describe('ArrowUpComponent', () => {
  let component: ArrowUpComponent;
  let fixture: ComponentFixture<ArrowUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
