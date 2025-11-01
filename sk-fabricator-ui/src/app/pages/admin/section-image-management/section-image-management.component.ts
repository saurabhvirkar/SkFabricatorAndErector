import { ChangeDetectionStrategy, Component, computed, signal, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../../../api.service';
import { AuthService } from '../../../auth.service';
import { SectionImage } from '../../../_models/section-image.model';
import { CommonModule } from '@angular/common';

type SectionName = 'AboutDetailsComponent' | 'ClientsDetailsComponent' | 'HomeComponent' | 'NewsletterComponent' | 'ProjectsComponent' | 'ServicesComponent' | 'TeamComponent';

@Component({
  selector: 'app-section-image-management',
  templateUrl: './section-image-management.component.html',
  styleUrls: ['./section-image-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionImageManagementComponent implements OnInit {
  private apiService = inject(ApiService);
  private authService = inject(AuthService);

  sections: SectionName[] = ['AboutDetailsComponent', 'ClientsDetailsComponent', 'HomeComponent', 'NewsletterComponent', 'ProjectsComponent', 'ServicesComponent', 'TeamComponent'];
  selectedSection = signal<SectionName | null>(null);
  images = signal<SectionImage[]>([]);
  selectedFile: File | null = null;

  isLoggedIn = toSignal(this.authService.isLoggedIn$, { initialValue: false });
  currentUserRole = toSignal(this.authService.currentUserRole$, { initialValue: null });

  isAdminOrManager = computed(() => {
    const role = this.currentUserRole();
    return role === 'Admin' || role === 'Manager';
  });

  ngOnInit(): void {
    // Load images for the first section by default
    if (this.sections.length > 0) {
      this.selectedSection.set(this.sections[0]);
      this.loadImages();
    }
  }

  loadImages(): void {
    if (this.selectedSection()) {
      this.apiService.getSectionImagesBySectionName(this.selectedSection()!).subscribe({
        next: (images) => {
          this.images.set(images);
        },
        error: (err) => {
          console.error('Failed to load images', err);
        }
      });
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  onSectionSelected(event: any): void {
    this.selectedSection.set(event.target.value);
    this.loadImages();
  }

  onUpload(): void {
    if (!this.selectedFile) {
      alert('Please select a file first!');
      return;
    }
    if (!this.selectedSection()) {
      alert('Please select a section for the image!');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.apiService.uploadSectionImage(formData, this.selectedSection()!).subscribe({
      next: () => {
        alert('Image uploaded successfully!');
        this.selectedFile = null;
        this.loadImages(); // Reload images to show the new one
        
        const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      },
      error: (err) => {
        console.error('Upload failed', err);
        alert('Image upload failed!');
      }
    });
  }

  onDeleteImage(id: number): void {
    if (confirm('Are you sure you want to delete this image?')) {
      this.apiService.deleteSectionImage(id).subscribe({
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
}
