import { Component, computed, signal, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { Observable, of, delay } from 'rxjs';
import { Inquiry } from '../../_models/inquiry.model';
import { InquiryService } from '../../_services/inquiry.service';

@Component({
  selector: 'app-inquiry-details',
  standalone: true,
  imports: [CommonModule, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush, 
  templateUrl: './inquiry-details.component.html',
  styleUrls: ['./inquiry-details.component.scss']
})
export class InquiryDetailsComponent implements OnInit {
  private inquiryService = inject(InquiryService);
  inquiries$: Observable<Inquiry[]> = this.inquiryService.getInquiries();
  // Track if the data is currently being fetched
  isFetching = signal(true);

  // Observable pipe to fetch and sort data, then mark fetching as complete
  private inquiriesObservable: Observable<Inquiry[]> = this.inquiryService.getInquiries().pipe(
    map((inquiries: Inquiry[]) => {
      // Sort by submittedAt (newest first)
      return inquiries.sort((a, b) => new Date(b.submittedAt ?? 0).getTime() - new Date(a.submittedAt ?? 0).getTime());
    }),
    map(inquiries => {
        this.isFetching.set(false); // Mark as complete once data is processed
        return inquiries;
    })
  ) as Observable<Inquiry[]>;

  // Writable signal to hold all inquiries.
  public totalInquiries = signal<Inquiry[]>([]);

  ngOnInit(): void {
    // Subscribe to the observable and set the signal's value when data arrives.
    this.inquiriesObservable.subscribe(inquiries => {
      this.totalInquiries.set(inquiries);
    });
  }
  
  // Pagination State Signals
  pageSize = signal(10);
  currentPage = signal(1); // Start at page 1

  // Computed Signals for Pagination Logic
  
  // Total number of pages required
  totalPages = computed(() => {
    const totalCount = this.totalInquiries()?.length || 0;
    return Math.ceil(totalCount / this.pageSize());
  });

  // Index of the first item on the current page
  startIndex = computed(() => (this.currentPage() - 1) * this.pageSize());
  
  // Index of the last item on the current page (exclusive)
  endIndex = computed(() => {
    const totalCount = this.totalInquiries()?.length || 0;
    return Math.min(this.startIndex() + this.pageSize(), totalCount);
  });

  // The subset of inquiries to display on the current page
  paginatedInquiries = computed(() => {
    const inquiries = this.totalInquiries();
    if (!inquiries || inquiries.length === 0) {
      return [];
    }
    return inquiries.slice(this.startIndex(), this.endIndex());
  });

  // A computed property that runs a side effect to fix the current page if it's out of bounds.
  // This is run implicitly by Angular's change detection when its dependencies change.
  checkPageBounds = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    if (current > total && total > 0) {
      // Auto-correct page number if it exceeds the new total pages
      this.currentPage.set(total);
    }
    return null; // Must return a value
  });

  // --- Pagination Methods ---

  /** Jumps to a specific page number. */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  /** Moves to the next page, if available. */
  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  /** Moves to the previous page, if available. */
  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }

  /** Generates the array of page numbers for the template. */
  getPageNumbers(): number[] {
    const total = this.totalPages();
    if (total <= 1) return [];

    const pageNumbers: number[] = [];
    for (let i = 1; i <= total; i++) {
        pageNumbers.push(i);
    }
    return pageNumbers;
  }

  /** Deletes an inquiry by its ID. */
  deleteInquiry(id: number | undefined): void {
    if (id === undefined) return;

    if (confirm('Are you sure you want to delete this inquiry? This action cannot be undone.')) {
      this.inquiryService.deleteInquiry(id).subscribe({
        next: () => {
          // On success, remove the inquiry from the main signal to update the UI
          this.totalInquiries.update(currentInquiries => 
            currentInquiries.filter(inq => inq.id !== id)
          );
        },
        error: (err) => console.error(`Failed to delete inquiry ${id}`, err),
      });
    }
  }
}
