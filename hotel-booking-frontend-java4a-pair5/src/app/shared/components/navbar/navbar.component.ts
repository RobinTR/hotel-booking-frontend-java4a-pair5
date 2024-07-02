import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../features/login/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLogged: boolean = false;

  constructor(private authService: AuthService, private change: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.authService.isLogged.subscribe((isLogged) =>
      this.setLoggedState(isLogged)
    );
  }

  private setLoggedState(isLogged: boolean): void {
    this.isLogged = isLogged;
    this.change.markForCheck();
  }
}
