import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../features/login/services/auth.service';
import { NavbarUserProfileComponent } from './navbar-user-profile/navbar-user-profile.component';
import { AuthRoles } from '../../../core/auth/constants/auth-roles';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarUserProfileComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLogged: boolean = false;
  roles?: AuthRoles[] | null;

  constructor(private authService: AuthService, private change: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.authService.isLogged.subscribe((isLogged) =>
      this.setLoggedState(isLogged)
    );
  }

  private setLoggedState(isLogged: boolean): void {
    this.isLogged = isLogged;
    this.roles = this.authService.roles;
    this.change.markForCheck();
  }
}
