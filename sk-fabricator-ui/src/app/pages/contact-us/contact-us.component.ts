import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InquiryService } from '../../_services/inquiry.service';
import { Inquiry } from '../../_models/inquiry.model';
import { MapComponent } from '../map/map.component';
import { InquiryFormComponent } from '../inquiry-form/inquiry-form.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MapComponent ,InquiryFormComponent],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent {
  private fb = inject(FormBuilder);
  // Integration Point: Injects the service responsible for API communication
  private inquiryService = inject(InquiryService); 

   // Contact details
    phoneNumber1 = '+91 9130 01 2070';
    phoneNumber2 = '+91 9552 03 4884';
    phoneNumber3 = '+91 8483 80 6320';
    email = 'skfabricator2070@gmail.com';
    address = '17/3/1 Shiv Colony, Wakad Rd, Ganesh Nagar, Thergaon, Pune, Maharashtra 411033';
  // Signals for managing submission state and response message
  submissionStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  responseMessage = signal('');

  // Form Group Definition
  inquiryForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    subject: [''],
    category: [''],
    preferredContact: ['Email'], // Set a default value
    message: ['', Validators.required],
  });

  /**
   * Handles the form submission logic.
   * This is the method where the API call integration occurs.
   */
  onSubmit() {
    // 1. Pre-submission checks
    if (this.inquiryForm.invalid) {
      this.inquiryForm.markAllAsTouched();
      this.responseMessage.set('Please fill out all required fields correctly (Name, Email, Message).');
      this.submissionStatus.set('error');
      return;
    }

    // Reset status and set to loading
    this.submissionStatus.set('loading');
    this.responseMessage.set('');

    const formValue = this.inquiryForm.value;
    const inquiryData: Inquiry = {
      name: formValue.name!,
      email: formValue.email!,
      phone: formValue.phone || "", // Correctly convert empty string to null
      subject: formValue.subject || "", // Correctly convert empty string to null
      category: formValue.category || "", // Correctly convert empty string to null
      preferredContact: formValue.preferredContact || "", // Correctly convert empty string to null
      message: formValue.message!,
    };

    // 2. API Service Integration
    this.inquiryService.submitInquiry(inquiryData).subscribe({
      next: (res: Inquiry) => {
        this.submissionStatus.set('success');
        this.responseMessage.set('Your inquiry has been sent successfully! We will get back to you shortly.'); // The backend now returns the created object. We can use it if needed.
        // Reset the form to its initial state, preserving defaults
        this.inquiryForm.reset({
          category: '',
          preferredContact: 'Email'
        });
      },
      error: (err: any) => {
        // 3. Error Handling for network/server issues
        this.submissionStatus.set('error');
        // Use the error message from the API if available, otherwise show a generic one.
        this.responseMessage.set(err.error?.message || 'An unexpected error occurred. Please try again.');
        console.error('Inquiry Submission Error:', err);
      }
    });
  }
}