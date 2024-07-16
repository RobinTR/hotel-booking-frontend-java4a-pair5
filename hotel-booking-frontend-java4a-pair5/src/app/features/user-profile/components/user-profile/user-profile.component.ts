import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { User } from '../../models/user-profile';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  user!: User;
  userProfileForm!: FormGroup;
  firstName!: string;
  lastName!: string;
  email!: string;
  address!: string;
  phone!: string;

  constructor(private userService: UserService, formBuilder: FormBuilder) {
    this.userProfileForm = formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      address: [''],
      phone: ['']
    });
  }

  onSubmit() {
            // Form submit işlemleri burada yapılacak
    console.log(this.userProfileForm.value); // Örnek olarak form değerlerini konsola yazdırabiliriz
  }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (user: User) => {
        this.user = user;
        // Form değerlerini kullanıcı verileriyle dolduruyoruz
        this.userProfileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          address: user.address,
          phone: user.phone
        });
      },
      (error) => {
        console.error('Error fetching user profile:', error);
        // Handle error here, show user-friendly message or redirect
      }
    );
  }
}
