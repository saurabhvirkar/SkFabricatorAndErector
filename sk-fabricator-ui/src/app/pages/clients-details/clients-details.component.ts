import { CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy, OnInit, signal, computed } from '@angular/core';
import { DataService } from '../../_services/data.service';
import { ApiService } from '../../api.service';
import { SectionImage } from '../../_models/section-image.model';
import { SectionImageManagerComponent } from '../admin/section-image-manager/section-image-manager.component';
import { AuthService } from '../../auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-clients-details',
  imports: [CommonModule, SectionImageManagerComponent],
  templateUrl: './clients-details.component.html',
  styleUrls: ['./clients-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsDetailsComponent implements OnInit {
  private dataService = inject(DataService);
  private apiService = inject(ApiService);
  private authService = inject(AuthService);

  clientImages = signal<SectionImage[]>([]);

  isLoggedIn = toSignal(this.authService.isLoggedIn$, { initialValue: false });
  currentUserRole = toSignal(this.authService.currentUserRole$, { initialValue: null });

  isAdminOrManager = computed(() => {
    const role = this.currentUserRole();
    return role === 'Admin' || role === 'Manager';
  });

  ngOnInit(): void {
    this.loadClientImages();
  }

  loadClientImages(): void {
    this.apiService.getSectionImagesBySectionName('ClientsDetailsComponent').subscribe({
      next: (images: SectionImage[]) => {
        this.clientImages.set(images);
      },
      error: (err: any) => {
        console.error('Failed to load client images for ClientsDetailsComponent', err);
      }
    });
  }
}