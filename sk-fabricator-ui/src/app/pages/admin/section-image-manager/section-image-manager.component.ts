import { ChangeDetectionStrategy, Component, computed, signal, OnInit, inject, Input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../../../api.service';
import { AuthService } from '../../../auth.service';
import { SectionImage } from '../../../_models/section-image.model';
import { CommonModule } from '@angular/common';

type SectionName = 'AboutDetailsComponent' | 'ClientsDetailsComponent' | 'HomeComponent' | 'NewsletterComponent' | 'ProjectsComponent' | 'ServicesComponent' | 'TeamComponent';

@Component({
  selector: 'app-section-image-manager',
  templateUrl: './section-image-manager.component.html',
  styleUrls: ['./section-image-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionImageManagerComponent implements OnInit {
  @Input({ required: true }) sectionName!: SectionName;

  private apiService = inject(ApiService);
  private authService = inject(AuthService);

  images = signal<SectionImage[]>([]);
  selectedFile: File | null = null;

  isLoggedIn = toSignal(this.authService.isLoggedIn$, { initialValue: false });
  currentUserRole = toSignal(this.authService.currentUserRole$, { initialValue: null });

  isAdminOrManager = computed(() => {
    const role = this.currentUserRole();
    return role === 'Admin' || role === 'Manager';
  });

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.apiService.getSectionImagesBySectionName(this.sectionName).subscribe({
      next: (images: SectionImage[]) => {
        this.images.set(images);
      },
      error: (err: any) => {
        console.error('Failed to load images', err);
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] ?? null;
  }

  onUpload(): void {
    if (!this.selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('sectionName', this.sectionName);

    this.apiService.uploadSectionImage(formData, this.sectionName).subscribe({
      next: () => {
        alert('Image uploaded successfully!');
        this.selectedFile = null;
        this.loadImages(); // Reload images to show the new one
        
        const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      },
      error: (err: any) => {
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
        error: (err: any) => {
          console.error('Delete failed', err);
          alert('Image deletion failed!');
        }
      });
    }
  }
}
