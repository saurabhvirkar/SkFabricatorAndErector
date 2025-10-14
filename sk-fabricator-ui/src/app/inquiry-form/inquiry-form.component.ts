// src/app/inquiry-form/inquiry-form.component.ts (UPDATED)

import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Inquiry } from '../_models/inquiry.model'; // Assuming you create this file

@Component({
  selector: 'app-inquiry-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
    preferredContact: [''], 
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

    const inquiryData: Inquiry = this.inquiryForm.value as Inquiry;

    // 2. API Service Integration
    this.apiService.submitInquiry(inquiryData).subscribe({
      next: (res: { success: boolean, message: string }) => {
        if (res.success) {
          this.submissionStatus.set('success');
          // Use the message returned from the mock API
          this.responseMessage.set(res.message); 
          // Reset the form on successful submission
          this.inquiryForm.reset({
            name: '', email: '', phone: '', subject: '', category: '', preferredContact: '', message: ''
          });
        } else {
          this.submissionStatus.set('error');
          // Use the error message returned from the mock API
          this.responseMessage.set(res.message); 
        }
      },
      error: (error) => {
        // 3. Error Handling for network/server issues
        this.submissionStatus.set('error');
        this.responseMessage.set('A severe network error occurred. Please check your connection and try again.');
        console.error('Inquiry Submission Error:', error);
      }
    });
  }
}