
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inquiry-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, HttpClientModule],
  templateUrl: './inquiry-form.component.html',
  styleUrl: './inquiry-form.component.scss'
})
export class InquiryFormComponent {
  name = '';
  email = '';
  message = '';
  success = false;
  error = '';

  constructor(private http: HttpClient) {}

  submitInquiry() {
    this.success = false;
    this.error = '';
    const inquiry = { name: this.name, email: this.email, message: this.message };
    this.http.post('/api/inquiry', inquiry).subscribe({
      next: () => {
        this.success = true;
        this.name = '';
        this.email = '';
        this.message = '';
      },
      error: err => {
        this.error = 'Failed to send inquiry. Please try again.';
      }
    });
  }
}
