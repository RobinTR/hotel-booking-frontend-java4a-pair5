import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss',
    '../../../../../../public/register-assets/fonts/material-icon/css/material-design-iconic-font.min.css',
    '../../../../../../public/register-assets/css/style.css'
  ]
})
export class RegisterComponent {

}
