import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss'],
})
export class NewsletterComponent {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);

  newsletterForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  submissionStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  responseMessage = signal('');

  onSubmit() {
    if (this.newsletterForm.invalid) {
      this.newsletterForm.markAllAsTouched();
      this.responseMessage.set('Please enter a valid email.');
      this.submissionStatus.set('error');
      return;
    }

    this.submissionStatus.set('loading');
    this.responseMessage.set('');

    this.apiService.subscribeNewsletter(this.newsletterForm.value.email!).subscribe(
      res => {
        this.responseMessage.set(res.message);
        this.submissionStatus.set(res.success ? 'success' : 'error');
        if (res.success) {
          this.newsletterForm.reset();
        }
      },
      error => {
        this.responseMessage.set('Subscription failed due to a network error.');
        this.submissionStatus.set('error');
      }
    );
  }
}
