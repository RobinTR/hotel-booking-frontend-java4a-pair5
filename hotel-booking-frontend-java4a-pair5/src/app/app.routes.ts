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
import { ContactComponent } from './features/contact/component/contact/contact.component';
import { securedRouteGuard } from './core/auth/guards/secured-route.guard';
import { AuthRoles } from './core/auth/constants/auth-roles';
import { UserProfileComponent } from './features/user-profile/components/user-profile/user-profile.component';
import { PaymentByCardComponent } from './features/user-profile/components/payment-by-card/payment-by-card.component';
import { PasswordComponent } from './features/user-profile/components/password/password.component';

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
        //component: BookingComponent
        canActivate: [securedRouteGuard],
        loadComponent: () => import('./features/booking/components/booking/booking.component').then(b => b.BookingComponent)
      },
      {
        path: "hoteldetails",
        //component: HotelDetailsComponent,
        loadComponent: () => import('./features/hotel-details/components/hotel-details/hotel-details.component').then(hd => hd.HotelDetailsComponent)
      },
      {
        path: "privacy-policy",
        component: PrivacyPolicyComponent
      },
      {
        path: "sss",
        component: SssComponent
      },
      {
        path: "contact",
        component: ContactComponent
      },
      {
        path: "user-profile",
        data: {
          securedRoute: {
            requiredRole: [AuthRoles.USER],
          },
        },
        canActivate: [securedRouteGuard],
        component: UserProfileComponent,
       
      } ,
      {
          path:"payment-by-card",
          data: {
            securedRoute: {
              requiredRole: [AuthRoles.USER],
            },
          },
          canActivate: [securedRouteGuard],
          component:PaymentByCardComponent
        },
        {
          path:"password",
          data: {
            securedRoute: {
              requiredRole: [AuthRoles.USER],
            },
          },
          canActivate: [securedRouteGuard],
          component:PasswordComponent
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
