import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../features/login/services/auth.service';

@Component({
  selector: 'app-navbar-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-user-profile.component.html',
  styleUrl: './navbar-user-profile.component.scss'
})
export class NavbarUserProfileComponent {
  @Input() isLogged: boolean = false;

  constructor(private authService: AuthService, private router: Router) {

  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
