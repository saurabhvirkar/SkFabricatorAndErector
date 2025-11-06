import { Component, inject, ChangeDetectionStrategy, OnInit, signal, computed } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { InquiryFormComponent } from '../inquiry-form/inquiry-form.component';
import { ServiceService } from '../../_services/service.service';
import { SectionImage } from '../../_models/section-image.model';
import { Service } from '../../_models'; // Import the correct Service interface

import { AuthService } from '../../auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, InquiryFormComponent, FormsModule, NgClass],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  // Added ChangeDetectionStrategy.OnPush
  changeDetection: ChangeDetectionStrategy.OnPush, 
})
export class ServicesComponent implements OnInit {
  private serviceService = inject(ServiceService);
  private authService = inject(AuthService);

  isLoggedIn = toSignal(this.authService.isLoggedIn$, { initialValue: false });
  currentUserRole = toSignal(this.authService.currentUserRole$, { initialValue: null });

  isAdminOrManager = computed(() => {
    const role = this.currentUserRole();
    return role === 'Admin' || role === 'Manager';
  });

  services = signal<Service[]>([]); // Renamed from dynamicServices
  showAddServiceForm = signal<boolean>(false); // New signal for form visibility
  editingService = signal<Service | null>(null);

  newService: Service = { id: 0, name: '', summary: '', description: '', imageUrl: '' };

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.serviceService.getServices().subscribe({
      next: (services) => {
        this.services.set(services);
      },
      error: (err) => {
        console.error('Failed to load services', err);
      }
    });
  }

  toggleAddServiceForm(): void {
    this.showAddServiceForm.update(value => !value);
  }

  toggleEditServiceForm(service: Service | null): void {
    this.editingService.set(service);
  }

  onAddService(form: any, files: FileList | null): void {
    if (form.valid && files && files.length > 0) {
      const formData = new FormData();
      formData.append('Name', form.value.name);
      formData.append('Summary', form.value.summary);
      formData.append('Description', form.value.description);
      formData.append('File', files[0]);

      this.serviceService.addService(formData).subscribe({
        next: (service) => {
          this.services.update(services => [...services, service]);
          this.toggleAddServiceForm(); // Hide form after submission
          form.reset();
        },
        error: (err) => {
          console.error('Failed to add service', err);
        }
      });
    }
  }

  onUpdateService(form: any, service: Service): void {
    if (form.valid) {
      const updatedServiceData = {
        id: service.id,
        name: form.value.name,
        summary: form.value.summary,
        description: form.value.description,
        imageUrl: service.imageUrl // Keep the existing image URL
      };
      this.serviceService.updateService(service.id, updatedServiceData).subscribe({
        next: (updatedService) => {
          this.services.update(services => {
            const index = services.findIndex(s => s.id === updatedService.id);
            if (index !== -1) {
              services[index] = updatedService;
            }
            return [...services];
          });
          this.toggleEditServiceForm(null);
        },
        error: (err) => {
          console.error('Failed to update service', err);
        }
      });
    }
  }

  deleteService(serviceId: number): void {
    if (confirm('Are you sure you want to delete this service?')) {
      this.serviceService.deleteService(serviceId).subscribe({
        next: () => {
          this.services.update(services => services.filter(s => s.id !== serviceId));
        },
        error: (err) => {
          console.error('Failed to delete service', err);
        }
      });
    }
  }

  onImageUpload(serviceId: number, files: FileList | null): void {
    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('File', file);
      formData.append('ServiceId', serviceId.toString());

      this.serviceService.addServiceImage(formData).subscribe({
        next: (updatedService) => {
          this.services.update(services => {
            const index = services.findIndex(s => s.id === updatedService.id);
            if (index !== -1) {
              services[index] = updatedService;
            }
            return [...services];
          });
        },
        error: (err) => {
          console.error('Failed to upload image', err);
        }
      });
    }
  }
}