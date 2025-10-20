// src/app/inquiry-form/inquiry-form.component.ts (UPDATED)

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Inquiry } from '../../_models/inquiry.model';
import { ContactMapComponent } from '../contact-map/contact-map.component';

@Component({
  selector: 'app-inquiry-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ContactMapComponent],
  templateUrl: './inquiry-form.component.html',
  styleUrls: ['./inquiry-form.component.scss'],
})
export class InquiryFormComponent {
  private fb = inject(FormBuilder);
  // Integration Point: Injects the service responsible for API communication
  private apiService = inject(ApiService); 

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
    this.apiService.submitInquiry(inquiryData).subscribe({
      next: (res) => {
        debugger
        this.submissionStatus.set('success');
        // The backend returns { success: true } without a message, so we provide one here.
        this.responseMessage.set('Your inquiry has been sent successfully! We will get back to you shortly.');
        // Reset the form to its initial state, preserving defaults
        this.inquiryForm.reset({
          category: '',
          preferredContact: 'Email'
        });
      },
      error: (err) => {
        debugger
        // 3. Error Handling for network/server issues
        this.submissionStatus.set('error');
        // Use the error message from the API if available, otherwise show a generic one.
        this.responseMessage.set(err.error?.message || 'An unexpected error occurred. Please try again.');
        console.error('Inquiry Submission Error:', err);
      }
    });
  }
}