import { CommonModule, Location } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserResponse } from '../../models/user-response';
import { UserService } from '../../services/user.service';
import { UserUpdateService } from '../../services/user-update.service';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { UserUpdateRequest } from '../../models/user-update-request';


@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit {
  user!: UserResponse;
  userProfileForm!: FormGroup;
  firstName!: string;
  lastName!: string;
  email!: string;
  address!: string;
  phone!: string;

  constructor(private userService: UserService, private authService: AuthService, formBuilder: FormBuilder, private userUpdateService: UserUpdateService, private location: Location) {
    this.userProfileForm = formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      address: [''],
      phone: ['']
    });
  }

  onSubmit() {
    let checkFirstName = this.userProfileForm.value.firstName;
    let checkLastName = this.userProfileForm.value.lastName;
    let checkEmail = this.userProfileForm.value.email;
    let checkAddress = this.userProfileForm.value.address;
    let checkPhone = this.userProfileForm.value.phone;

    if (this.userProfileForm.valid) {
      if (this.firstName != checkFirstName || this.lastName != checkLastName
        || this.email != checkEmail || this.address != checkAddress
        || this.phone != checkPhone) {

        let user: UserUpdateRequest = {
          id: this.authService.userId,
          firstName: checkFirstName,
          lastName: checkLastName,
          email: checkEmail,
          phone: checkPhone
        };

        this.userUpdateService.updateUser(user).subscribe(
          (response: UserResponse) => {
            this.refreshPage();
          },
          (error: any) => {
            console.error('User Profile Update error', error);
          }
        );
      }
    }
  }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      (user: UserResponse) => {
        this.user = user;
        this.userProfileForm.patchValue({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          address: user.fullAddress,
          phone: user.phone
        });
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  refreshPage() {
    this.location.go(this.location.path());
  }
}
