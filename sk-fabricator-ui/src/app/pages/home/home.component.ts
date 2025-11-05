import { Component, inject, OnDestroy, PLATFORM_ID, OnInit, signal, computed } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AccoladesComponent } from '../../accolades/accolades.component';
import { InquiryFormComponent } from '../inquiry-form/inquiry-form.component';
import { RouterLink } from '@angular/router';
import { AboutDetailsComponent } from '../about-details/about-details.component';
import { ServiceService } from '../../_services/service.service';
import { Service } from '../../_models/data.model';
import { HomeSlider } from '../../_models/home-slider.model';
import { FormsModule } from '@angular/forms';
import { switchMap, of } from 'rxjs';
import { AuthService } from '../../auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { HomeSliderService } from '../../_services/home-slider.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    AccoladesComponent,
    InquiryFormComponent,
    RouterLink,
    AboutDetailsComponent,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private serviceService = inject(ServiceService);
  private homeSliderService = inject(HomeSliderService);
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
  backgroundSlides = signal<HomeSlider[]>([]);
  currentSlideIndex = 0;
  private intervalId: any;

  heroTitle = signal<string>('');
  heroDescription = signal<string>('');

  ngOnInit(): void {
    this.loadBackgroundSlides();
    this.loadFeaturedServices();
  }

  loadFeaturedServices(): void {
    this.serviceService.getServices().subscribe({
      next: (services: Service[]) => {
        this.featuredServices.set(services.slice(0, 3));
      },
      error: (err: any) => {
        console.error('Failed to load featured services', err);
      }
    });
  }

  loadBackgroundSlides(): void {
    this.homeSliderService.getHomeSliders().subscribe({
      next: (sliders: HomeSlider[]) => {
        this.backgroundSlides.set(sliders);
        if (sliders.length > 0) {
          this.heroTitle.set(sliders[0].title);
          this.heroDescription.set(sliders[0].description);
        }
        if (isPlatformBrowser(this.platformId) && sliders.length > 0) {
          this.startAutoSlide();
        }
      },
      error: (err: any) => {
        console.error('Failed to load home slider items', err);
      }
    });
  }

  onAddHomeSlider(title: string, description: string, file: FileList | null): void {
    if (!title || !description) {
      console.error('Title and Description are required.');
      return;
    }

    this.homeSliderService.addHomeSlider({ title, description }).subscribe({
      next: (newSlider: HomeSlider) => {
        this.backgroundSlides.update(sliders => [...sliders, newSlider]);
        // If this is the first slide, update hero text
        if (this.backgroundSlides().length === 1) {
          this.heroTitle.set(newSlider.title);
          this.heroDescription.set(newSlider.description);
        }

        if (file && file.length > 0) {
          const formData = new FormData();
          formData.append('file', file[0]);
          formData.append('homeSliderId', newSlider.id.toString());
          this.homeSliderService.addHomeSliderImage(formData).subscribe({
            next: (sliderWithImage: HomeSlider) => {
              this.backgroundSlides.update(sliders =>
                sliders.map(s => (s.id === newSlider.id ? sliderWithImage : s))
              );
            },
            error: (err: any) => {
              console.error('Failed to add home slider image', err);
            }
          });
        }
      },
      error: (err: any) => {
        console.error('Failed to add home slider item', err);
      }
    });
  }

  onUpdateHomeSlider(id: number, title: string, description: string): void {
    if (!title || !description) {
      console.error('Title and Description are required.');
      return;
    }
    this.homeSliderService.updateHomeSlider(id, { title, description }).subscribe({
      next: (updatedSlider: HomeSlider) => {
        this.backgroundSlides.update(sliders =>
          sliders.map(s => (s.id === id ? updatedSlider : s))
        );
        // If the updated slide is the current hero slide, update hero text
        if (this.backgroundSlides()[this.currentSlideIndex]?.id === id) {
          this.heroTitle.set(updatedSlider.title);
          this.heroDescription.set(updatedSlider.description);
        }
      },
      error: (err: any) => {
        console.error('Failed to update home slider item', err);
      }
    });
  }

  onDeleteHomeSlider(id: number): void {
    if (confirm('Are you sure you want to delete this home slider item?')) {
      this.homeSliderService.deleteHomeSlider(id).subscribe({
        next: () => {
          this.backgroundSlides.update(sliders => sliders.filter(s => s.id !== id));
          // If the deleted slide was the current hero slide, update hero text from the new first slide
          if (this.backgroundSlides().length > 0) {
            this.heroTitle.set(this.backgroundSlides()[0].title);
            this.heroDescription.set(this.backgroundSlides()[0].description);
          } else {
            this.heroTitle.set('');
            this.heroDescription.set('');
          }
        },
        error: (err: any) => {
          console.error('Failed to delete home slider item', err);
        }
      });
    }
  }

  onAddHomeSliderImage(homeSliderId: number, file: FileList | null): void {
    if (!file || file.length === 0) {
      console.error('No image file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file[0]);
    formData.append('homeSliderId', homeSliderId.toString());

    this.homeSliderService.addHomeSliderImage(formData).subscribe({
      next: (updatedSlider: HomeSlider) => {
        this.backgroundSlides.update(sliders =>
          sliders.map(s => (s.id === homeSliderId ? updatedSlider : s))
        );
        // If the updated slide is the current hero slide, update hero text
        if (this.backgroundSlides()[this.currentSlideIndex]?.id === homeSliderId) {
          this.heroTitle.set(updatedSlider.title);
          this.heroDescription.set(updatedSlider.description);
        }
      },
      error: (err: any) => {
        console.error('Failed to upload image for home slider', err);
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
        // Update hero text based on the current slide
        this.heroTitle.set(this.backgroundSlides()[this.currentSlideIndex].title);
        this.heroDescription.set(this.backgroundSlides()[this.currentSlideIndex].description);
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