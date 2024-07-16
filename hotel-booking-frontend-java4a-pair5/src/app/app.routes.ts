
import { Routes } from '@angular/router';
import { RegisterComponent } from './features/register/components/register/register.component';
import { LoginComponent } from './features/login/components/login/login.component';
import { AboutComponent } from './features/about/components/about/about.component';
import { HomepageComponent } from './features/homepage/components/homepage/homepage.component';
import { PrivacyPolicyComponent } from './shared/components/footer/company/privacy-policy/privacy-policy.component';
import { SssComponent } from './features/SSS/sss/sss.component';
import { ContactComponent } from './features/contact/component/contact/contact.component';
import { securedRouteGuard } from './core/auth/guards/secured-route.guard';
import { AuthRoles } from './core/auth/constants/auth-roles';
import { UserProfileComponent } from './features/user-profile/components/user-profile/user-profile.component';
import { PaymentByCardComponent } from './features/user-profile/components/payment-by-card/payment-by-card.component';
import { PasswordComponent } from './features/user-profile/components/password/password.component';
import { BookingDetailComponent } from './features/user-bookings/components/booking-detail/booking-detail.component';
import { BookingListComponent } from './features/user-bookings/components/booking-list/booking-list.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { HotelAddFormComponent } from './features/manager-panel/components/hotel-add-form/hotel-add-form.component';
import { ManagerHotelListComponent } from './features/manager-panel/components/manager-hotel-list/manager-hotel-list.component';

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
        path: "faq",
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
       
      },
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
        },
        {
          path:"booking-list",
          data: {
            securedRoute: {
              requiredRole: [AuthRoles.USER],
            },
          },
          canActivate: [securedRouteGuard],
          component: BookingListComponent
        },
        {
          path:"booking-detail",
          data: {
            securedRoute: {
              requiredRole: [AuthRoles.USER],
            },
          },
          canActivate: [securedRouteGuard],
          component: BookingDetailComponent
        },
        {
          path: "hotel-add",
          component: HotelAddFormComponent,
        },
        {
          path: "manager-hotel-list",
          component: ManagerHotelListComponent
        },
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
