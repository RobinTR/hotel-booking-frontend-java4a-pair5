import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

userProfileForm!: FormGroup;
firstName!: string
lastName!: string
email!: string
address!:string
phone!: string
constructor(formBuilder: FormBuilder, private change: ChangeDetectorRef){
  this.userProfileForm = formBuilder.group({
    firstName: [''],
    lastName: [''],
    email: [''],
    address:[''],
    phone: ['']

  });
}

onSubmit() {

}
}
