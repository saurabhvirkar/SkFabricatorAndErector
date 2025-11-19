import { CommonModule } from '@angular/common';
import { Component, inject, ChangeDetectionStrategy, OnInit, signal, computed } from '@angular/core';
import { ClientDetails } from '../../_models';
import { AuthService } from '../../auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../_services/client.service';

@Component({
  standalone: true,
  selector: 'app-clients-details',
  imports: [CommonModule, FormsModule],
  templateUrl: './clients-details.component.html',
  styleUrls: ['./clients-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsDetailsComponent implements OnInit {
  private clientService = inject(ClientService);
  private authService = inject(AuthService);

  clients = signal<ClientDetails[]>([]);
  showAddClientForm = signal<boolean>(false);
  editClient = signal<ClientDetails | null>(null);
  isEditing = computed(() => this.editClient() !== null);
  newClient: ClientDetails = { id: 0, name: '', imageUrl: '', clientUrl: '' };
  isLoggedIn = toSignal(this.authService.isLoggedIn$, { initialValue: false });
  currentUserRole = toSignal(this.authService.currentUserRole$, { initialValue: null });

  isAdminOrManager = computed(() => {
    const role = this.currentUserRole();
    return role === 'Admin' || role === 'Manager';
  });

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClientDetails().subscribe({
      next: (clients: ClientDetails[]) => {
        this.clients.set(clients);
      },
      error: (err: any) => {
        console.error('Failed to load clients', err);
      }
    });
  }

  toggleAddClientForm(): void {
    this.showAddClientForm.update(value => !value);
    if (!this.showAddClientForm()) {
      this.newClient = { id: 0, name: '', imageUrl: '', clientUrl: '' }; // Reset form
    }
  }

  onAddClient(form: any, files: FileList | null): void {
    if (form.valid && files && files.length > 0) {
      const formData = new FormData();
      formData.append('name', this.newClient.name);
      formData.append('clientUrl', this.newClient.clientUrl || '');
      formData.append('file', files[0]);

      this.clientService.addClient(formData).subscribe({
        next: (client) => {
          this.clients.update(clients => [...clients, client]);
          this.toggleAddClientForm();
          form.resetForm(); // Reset the form after successful submission
        },
        error: (err) => {
          console.error('Failed to add client', err);
        }
      });
    }
  }

  startEdit(client: ClientDetails): void {
    this.editClient.set({ ...client });
  }

  cancelEdit(): void {
    this.editClient.set(null);
  }

  onUpdateClient(): void {
    const clientToUpdate = this.editClient();
    if (clientToUpdate && clientToUpdate.id) {
      // Create a DTO for updating, excluding the image file for now
      const updateDto = { ...clientToUpdate };
      // If image update is separate, handle it in onImageUpload

      this.clientService.updateClient(clientToUpdate.id, updateDto).subscribe({
        next: (updatedClient) => {
          this.clients.update(clients =>
            clients.map(c => (c.id === updatedClient.id ? updatedClient : c))
          );
          this.cancelEdit();
        },
        error: (err) => {
          console.error('Failed to update client', err);
        }
      });
    }
  }

  onDeleteClient(id: number): void {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          this.clients.update(clients => clients.filter(c => c.id !== id));
        },
        error: (err) => {
          console.error('Failed to delete client', err);
        }
      });
    }
  }

  onImageUpload(clientId: number, files: FileList | null): void {
    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('clientId', clientId.toString());

      this.clientService.addClientImage(formData).subscribe({
        next: (updatedClient) => {
          this.clients.update(clients => {
            const index = clients.findIndex(c => c.id === updatedClient.id);
            if (index !== -1) {
              clients[index] = updatedClient;
            }
            return [...clients];
          });
        },
        error: (err) => {
          console.error('Failed to upload image', err);
        }
      });
    }
  }
}