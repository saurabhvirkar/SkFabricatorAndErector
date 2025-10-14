import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private router = inject(Router);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  submissionStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  responseMessage = signal('');

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.responseMessage.set('Please enter both username and password.');
      this.submissionStatus.set('error');
      return;
    }

    this.submissionStatus.set('loading');
    this.responseMessage.set('');

    this.apiService.adminLogin(this.loginForm.value).subscribe(
      res => {
        if (res.success) {
          this.submissionStatus.set('success');
          this.responseMessage.set('Login successful! Redirecting...');
          // In a real app, store token (res.token) and navigate to the admin dashboard
          setTimeout(() => this.router.navigate(['/']), 1000); // Mock redirect
        } else {
          this.submissionStatus.set('error');
          this.responseMessage.set(res.message);
        }
      },
      error => {
        this.submissionStatus.set('error');
        this.responseMessage.set('A communication error occurred.');
        console.error('Login Error:', error);
      }
    );
  }
}
