import { LayoutComponent } from './shared/components/layout/layout.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './features/register/components/register/register.component';
import { LoginComponent } from './features/login/components/login/login.component';
import { AboutComponent } from './features/about/components/about/about.component';
import { HomepageComponent } from './features/homepage/components/homepage/homepage.component';
import { BookingComponent } from './features/booking/components/booking/booking.component';
import { HotelDetailsComponent } from './features/hotel-details/components/hotel-details/hotel-details.component';
import { PrivacyPolicyComponent } from './shared/components/footer/company/privacy-policy/privacy-policy.component';
import { SssComponent } from './features/SSS/sss/sss.component';

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
      },
      {
        path: "privacypolicy",
        component: PrivacyPolicyComponent
      },
      {
        path: "sss",
        component: SssComponent
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
