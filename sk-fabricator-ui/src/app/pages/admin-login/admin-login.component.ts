import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss'],
})
export class AdminLoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

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

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        if (response.success) {
          this.submissionStatus.set('success');
          this.responseMessage.set('Login successful! Redirecting...');
          this.router.navigate(['/']); // Navigate to home on successful login
        } else {
          this.submissionStatus.set('error');
          this.responseMessage.set(response.message);
        }
      },
      error: (error) => {
        this.submissionStatus.set('error');
        this.responseMessage.set('A communication error occurred.');
        console.error('Login Error:', error);
      }
    });
  }
}
