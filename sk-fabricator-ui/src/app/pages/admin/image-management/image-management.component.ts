import { ChangeDetectionStrategy, Component, computed, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth.service';
import { SectionImage } from '../../../_models/section-image.model';
import { FormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { SectionImageService } from '../../../_services/section-image.service';

@Component({
  selector: 'app-image-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-management.component.html',
  styleUrls: ['./image-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageManagementComponent implements OnInit {
  private sectionImgService = inject(SectionImageService);
  private authService = inject(AuthService);

  sections = [
    'AboutDetailsComponent',
    'ClientsDetailsComponent',
    'GalleryComponent',
    'HomeComponent',
    'NewsletterComponent',
    'ProjectsComponent',
    'ServicesComponent',
    'TeamComponent',
  ];

  selectedSection = signal<string | null>(null);
  sectionImages = signal<SectionImage[]>([]);
  selectedFile: File | null = null;

  isLoggedIn = toSignal(this.authService.isLoggedIn$);
  currentUserRole = toSignal(this.authService.currentUserRole$);

  isAdmin = computed(() => this.currentUserRole() === 'Admin');

  ngOnInit(): void {
    // Optionally load all images if needed, or wait for section selection
  }

  onSectionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedSection.set(selectElement.value);
    this.loadSectionImages();
  }

  loadSectionImages(): void {
    const section = this.selectedSection();
    if (section) {
      this.sectionImgService.getSectionImagesBySectionName(section).subscribe({
        next: (images: SectionImage[]) => {
          this.sectionImages.set(images);
        },
        error: (err: any) => {
          console.error('Failed to load section images', err);
          this.sectionImages.set([]);
        },
      });
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  onUpload(): void {
    if (!this.selectedFile || !this.selectedSection()) {
      alert('Please select a file and a section.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('sectionName', this.selectedSection()!); // Add sectionName to formData

    this.sectionImgService.uploadSectionImage(formData, this.selectedSection()!).subscribe({
      next: (image: SectionImage) => {
        alert('Image uploaded successfully!');
        this.selectedFile = null;
        this.loadSectionImages(); // Reload images for the current section
      },
      error: (err: any) => {
        console.error('Upload failed', err);
        alert('Image upload failed!');
      },
    });
  }

  onDeleteImage(id: number): void {
    if (confirm('Are you sure you want to delete this image?')) {
      this.sectionImgService.deleteSectionImage(id).subscribe({
        next: () => {
          alert('Image deleted successfully!');
          this.loadSectionImages(); // Reload images for the current section
        },
        error: (err: any) => {
          console.error('Delete failed', err);
          alert('Image deletion failed!');
        },
      });
    }
  }
}
