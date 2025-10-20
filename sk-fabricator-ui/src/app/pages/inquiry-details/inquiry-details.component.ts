import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../api.service';
import { Inquiry } from '../../_models/inquiry.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inquiry-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="inquiry-details-page py-12 bg-gray-50 min-w-full">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <header class="text-center mb-12">
          <h1 class="text-4xl font-extrabold text-gray-900">Received Inquiries</h1>
          <p class="text-xl text-gray-600 mt-2">Review and manage customer submissions.</p>
        </header>

        @if (inquiries$ | async; as inquiries) {
          @if (inquiries.length > 0) {
            <div class="bg-white shadow-lg rounded-xl overflow-hidden">
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-100">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    @for (inquiry of inquiries; track inquiry.name) {
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ inquiry.name }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ inquiry.email }}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{{ inquiry.subject }}</td>
                        <td class="px-6 py-4 whitespace-normal text-sm text-gray-600 max-w-md">{{ inquiry.message }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          } @else {
            <div class="text-center py-16 text-gray-500">
              <p class="text-2xl font-semibold">No inquiries found.</p>
            </div>
          }
        } @else {
          <div class="text-center py-16 text-gray-500">
            <p>Loading inquiries...</p>
          </div>
        }
      </div>
    </div>
  `
})
export class InquiryDetailsComponent {
  private apiService = inject(ApiService);
  inquiries$: Observable<Inquiry[]> = this.apiService.getInquiries();
}