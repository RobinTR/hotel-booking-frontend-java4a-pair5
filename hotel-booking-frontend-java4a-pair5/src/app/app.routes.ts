import path from 'path';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { BookingComponent } from './pages/booking/booking.component';
import { HotelDetailsComponent } from './pages/hotel-details/hotel-details.component';

export const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        component: HomepageComponent
      },
      {
        path: "about",
        component: AboutComponent
      },
      {
        path: "booking",
        component: BookingComponent
      },
      {
        path: "hoteldetails",
        component: HotelDetailsComponent
      }
    ]
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  }
];
