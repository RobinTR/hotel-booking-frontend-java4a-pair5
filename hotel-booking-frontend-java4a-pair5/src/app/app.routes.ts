import path from 'path';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { Routes } from '@angular/router';
import { HomepageComponent } from './shared/components/homepage/homepage.component';
import { AboutComponent } from './shared/components/about/about.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

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
