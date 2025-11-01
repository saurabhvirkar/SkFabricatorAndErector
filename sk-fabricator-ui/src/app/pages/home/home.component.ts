import { Component, inject, OnDestroy, PLATFORM_ID, OnInit, signal, computed } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AccoladesComponent } from '../../accolades/accolades.component';
import { InquiryFormComponent } from '../inquiry-form/inquiry-form.component';
import { DataService } from '../../_services/data.service';
import { RouterLink } from '@angular/router';
import { AboutDetailsComponent } from '../about-details/about-details.component';
import { ApiService } from '../../api.service';
import { SectionImage } from '../../_models/section-image.model';
import { Service } from '../../_models/service.model';
import { SectionImageManagerComponent } from '../admin/section-image-manager/section-image-manager.component';
import { AuthService } from '../../auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AccoladesComponent,
    InquiryFormComponent,
    RouterLink,
    AboutDetailsComponent,
    SectionImageManagerComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
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

  featuredServices = signal<Service[]>([]);

  // Background slider properties
  backgroundSlides = signal<SectionImage[]>([]);
  currentSlideIndex = 0;
  private intervalId: any;

  ngOnInit(): void {
    this.loadBackgroundSlides();
    this.loadFeaturedServices();
  }

  loadFeaturedServices(): void {
    this.apiService.getServices().subscribe({
      next: (services) => {
        this.featuredServices.set(services.slice(0, 3));
      },
      error: (err) => {
        console.error('Failed to load featured services', err);
      }
    });
  }

  loadBackgroundSlides(): void {
    this.apiService.getSectionImagesBySectionName('HomeComponent').subscribe({
      next: (images) => {
        this.backgroundSlides.set(images);
        if (isPlatformBrowser(this.platformId) && images.length > 0) {
          this.startAutoSlide();
        }
      },
      error: (err) => {
        console.error('Failed to load background slides for HomeComponent', err);
      }
    });
  }

  startAutoSlide(): void {
    if (isPlatformBrowser(this.platformId) && this.backgroundSlides().length > 0) {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      this.intervalId = setInterval(() => {
        this.currentSlideIndex =
          (this.currentSlideIndex + 1) % this.backgroundSlides().length;
      }, 3000); // Change image every 3 seconds
    }
  }

  ngOnDestroy(): void {
    // Clean up the interval when the component is destroyed
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}