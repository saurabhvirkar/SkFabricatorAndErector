import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inquiry-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './inquiry-form.component.html',
  styleUrl: './inquiry-form.component.scss'
})
export class InquiryFormComponent {
  inquiryForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.inquiryForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subject: [''],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.inquiryForm.valid) {
      this.api.submitInquiry(this.inquiryForm.value).subscribe({
        next: () => {
          this.successMessage = 'Your inquiry has been sent!';
          this.errorMessage = null;
          this.inquiryForm.reset();
        },
        error: (err) => {
          this.successMessage = null;
          this.errorMessage = 'Failed to send inquiry. Please try again.';
        }
      });
    } else {
      this.successMessage = null;
      this.errorMessage = 'Please fill all required fields.';
    }
  }
}
