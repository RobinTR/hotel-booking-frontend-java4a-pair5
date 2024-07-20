import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ContactService } from '../../services/contact.service';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, ContactComponent],
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  supportForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
    this.supportForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(128)]],
      description: ['']
    });
  }

  onSubmit(): void {
    if (this.supportForm.valid) {
      const formData = this.supportForm.value;
      this.contactService.postContactForm(formData)
        .subscribe({
          next: (response) => {
            console.log('Form Data Submitted:', response);
            this.supportForm.reset();
          },
          error: (error) => {
            console.error('Error submitting form:', error);
          }
        });
    }
  }
}
