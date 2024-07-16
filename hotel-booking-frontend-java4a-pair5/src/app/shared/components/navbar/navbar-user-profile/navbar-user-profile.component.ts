import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../features/login/services/auth.service';
import { AuthRoles } from '../../../../core/auth/constants/auth-roles';

@Component({
  selector: 'app-navbar-user-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-user-profile.component.html',
  styleUrl: './navbar-user-profile.component.scss'
})
export class NavbarUserProfileComponent implements OnInit {
  @Input() isLogged: boolean = false;
  @Input() roles?: AuthRoles[] | null;
  isManager?: boolean;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    if (this.roles) {
      this.isManager = this.roles.includes(AuthRoles.MANAGER);
    }
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
