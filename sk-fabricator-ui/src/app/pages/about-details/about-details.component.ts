import { Component, inject, PLATFORM_ID, ChangeDetectionStrategy, OnDestroy, OnInit, signal, computed } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { DataService } from '../../_services/data.service';
import { ApiService } from '../../api.service';
import { SectionImage } from '../../_models/section-image.model';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-about-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './about-details.component.html',
  styleUrls: ['./about-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutDetailsComponent implements OnInit, OnDestroy {
  private dataService = inject(DataService);
  private apiService = inject(ApiService);
  private authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);

  isLoggedIn = toSignal(this.authService.isLoggedIn$, { initialValue: false });
  currentUserRole = toSignal(this.authService.currentUserRole$, { initialValue: null });

  isAdminOrManager = computed(() => {
    const role = this.currentUserRole();
    return role === 'Admin' || role === 'Manager';
  });
  
  sectionImages = signal<SectionImage[]>([]);
  currentSlideIndex: number = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.loadSliderImages();
  }

  loadSliderImages(): void {
    this.apiService.getSectionImagesBySectionName('AboutDetailsComponent').subscribe({
      next: (images: SectionImage[]) => {
        this.sectionImages.set(images);
        if (isPlatformBrowser(this.platformId) && images.length > 0) {
          this.startAutoSlide();
        }
      },
      error: (err: any) => {
        console.error('Failed to load slider images for AboutDetailsComponent', err);
      }
    });
  }

  /*
  onAddImage(files: FileList | null): void {
    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('sectionName', 'AboutDetailsComponent');

      this.apiService.uploadSectionImage(formData, 'AboutDetailsComponent').subscribe({
        next: (image: SectionImage) => {
          this.sectionImages.update(images => [...images, image]);
        },
        error: (err: any) => {
          console.error('Failed to add image', err);
        }
      });
    }
  }
  */

  onDeleteImage(id: number): void {
    if (confirm('Are you sure you want to delete this image?')) {
      this.apiService.deleteSectionImage(id).subscribe({
        next: () => {
          this.sectionImages.update(images => images.filter(s => s.id !== id));
        },
        error: (err) => {
          console.error('Failed to delete image', err);
        }
      });
    }
  }

  changeSlide(step: number): void {
    const totalSlides = this.sectionImages().length;
    if (totalSlides === 0) return;
    this.currentSlideIndex = (this.currentSlideIndex + step + totalSlides) % totalSlides;
    this.resetAutoSlide();
  }

  goToSlide(index: number): void {
    const totalSlides = this.sectionImages().length;
    if (totalSlides === 0) return;
    this.currentSlideIndex = index;
    this.resetAutoSlide();
  }

  startAutoSlide(): void {
    if (isPlatformBrowser(this.platformId) && this.sectionImages().length > 0) {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      this.intervalId = setInterval(() => {
        this.currentSlideIndex = (this.currentSlideIndex + 1) % this.sectionImages().length;
      }, 3000);
    }
  }

  resetAutoSlide(): void {
    if (isPlatformBrowser(this.platformId)) {
      clearInterval(this.intervalId);
      this.startAutoSlide();
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}