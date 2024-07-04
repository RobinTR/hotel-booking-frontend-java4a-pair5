import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarUserProfileComponent } from './navbar-user-profile.component';

describe('NavbarUserProfileComponent', () => {
  let component: NavbarUserProfileComponent;
  let fixture: ComponentFixture<NavbarUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarUserProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
