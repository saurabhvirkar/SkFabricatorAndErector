import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-newsletter',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss'
})
export class NewsletterComponent {
  newsletterForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.newsletterForm.valid) {
      this.api.subscribeNewsletter(this.newsletterForm.value).subscribe({
        next: () => {
          this.successMessage = 'You have subscribed successfully!';
          this.errorMessage = null;
          this.newsletterForm.reset();
        },
        error: () => {
          this.successMessage = null;
          this.errorMessage = 'Subscription failed. Please try again.';
        }
      });
    } else {
      this.successMessage = null;
      this.errorMessage = 'Please enter a valid email address.';
    }
  }
}
