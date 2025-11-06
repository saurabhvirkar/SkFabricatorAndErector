import { ChangeDetectionStrategy, Component, computed, signal, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '../../auth.service';
import { GalleryImage } from '../../_models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GalleryService } from '../../_services/gallery.service';

/**
 * Define the strict union type for image categories.
 * This ensures type safety and resolves the compiler error in the template.
 */
type ImageCategory = 'All' | 'Piping' | 'Fabrication' | 'Erection' | 'Maintenance';

/**
 * The main application component, now serving as the Work Gallery showcase.
 * It contains all logic and templates for the feature.
 */
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
})
export class GalleryComponent implements OnInit {
  private galleryService = inject(GalleryService);
  private authService = inject(AuthService);

  // Static Data & Setup
  currentYear = new Date().getFullYear();
  
  // Use the strict type for the categories array
  categories: ImageCategory[] = ['All', 'Piping', 'Fabrication', 'Erection', 'Maintenance'];

  // Gallery image data
  images = signal<GalleryImage[]>([]);
  selectedFile: File | null = null;
  selectedCategoryForUpload = signal<ImageCategory | null>(null);
  isAboutSliderChecked = signal(false);

  // State
  activeFilter = signal<ImageCategory>('All'); 
  selectedImage = signal<GalleryImage | null>(null);

  // Convert observables to signals
  isLoggedIn = toSignal(this.authService.isLoggedIn$, { initialValue: false });
  currentUserRole = toSignal(this.authService.currentUserRole$, { initialValue: null });

  uploadCategories = computed(() => this.categories.filter(c => c !== 'All'));

  isAdminOrManager = computed(() => {
    const role = this.currentUserRole();
    return role === 'Admin' || role === 'Manager';
  });

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.galleryService.getImages(this.activeFilter()).subscribe({
      next: (images) => {
        this.images.set(images);
      },
      error: (err) => {
        console.error('Failed to load images', err);
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  onCategorySelected(event: any): void {
    this.selectedCategoryForUpload.set(event.target.value);
  }

  onUpload(): void {
    if (!this.selectedFile) {
      alert('Please select a file first!');
      return;
    }
    if (!this.selectedCategoryForUpload()) {
      alert('Please select a category for the image!');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('category', this.selectedCategoryForUpload()!);
    formData.append('isAboutSlider', this.isAboutSliderChecked().toString());

    this.galleryService.uploadImage(formData, this.selectedCategoryForUpload()!, this.isAboutSliderChecked()).subscribe({
      next: () => {
        alert('Image uploaded successfully!');
        this.selectedFile = null;
        this.selectedCategoryForUpload.set(null);
        this.isAboutSliderChecked.set(false);
        this.loadImages(); // Reload images to show the new one
        
        // Reset the file input element
        const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      },
      error: (err) => {
        console.error('Upload failed', err);
        alert('Image upload failed!');
      }
    });
  }

  onDeletePhoto(id: number): void {
    if (confirm('Are you sure you want to delete this image?')) {
      this.galleryService.deleteImage(id).subscribe({
        next: () => {
          alert('Image deleted successfully!');
          this.loadImages(); // Reload images to update the list
        },
        error: (err) => {
          console.error('Delete failed', err);
          alert('Image deletion failed!');
        }
      });
    }
  }

  /**
   * Updates the active filter and triggers the computed signal to update the list.
   * @param category The category to filter by (strictly typed).
   */
  setFilter(category: ImageCategory) {
    this.activeFilter.set(category);
    this.loadImages();
  }

  /**
   * Opens the lightbox with the selected image.
   * @param image The image to display in the lightbox.
   */
  openLightbox(image: GalleryImage) {
    this.selectedImage.set(image);
  }

  /**
   * Closes the lightbox.
   */
  closeLightbox() {
    this.selectedImage.set(null);
  }
}