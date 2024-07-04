import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Register } from '../../models/register';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss',
    '../../../../../../public/register-assets/fonts/material-icon/css/material-design-iconic-font.min.css',
    '../../../../../../public/register-assets/css/style.css'
  ]
})
export class RegisterComponent {
  registerForm!: FormGroup;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  rePassword!: string;
  address!: string;

  constructor(formBuilder: FormBuilder, private change: ChangeDetectorRef, private registerService: RegisterService, private router: Router) {
    this.registerForm = formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(128)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]],
      rePassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]]
    });
  }

  onRegister() {
    if (this.registerForm.invalid) {
      console.error('Invalid form');
      return;
    }

    this.register();
  }

  register() {
    if (this.registerForm.valid) {
      const userToRegister: Register = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password
      };

      this.registerService.register(userToRegister)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/user-profile']);
          },
          error: (error) => {
            console.error('Error submitting form:', error);
          }
        });
    }
  }


}
