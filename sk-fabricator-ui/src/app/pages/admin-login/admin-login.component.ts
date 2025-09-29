import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-admin-login',
  imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.api.login(this.loginForm.value).subscribe({
        next: (res) => {
          this.successMessage = 'Login successful!';
          this.errorMessage = null;
          // TODO: Store user info/token, redirect as needed
        },
        error: () => {
          this.successMessage = null;
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      });
    } else {
      this.errorMessage = 'Please fill all required fields.';
      this.successMessage = null;
    }
  }
}
