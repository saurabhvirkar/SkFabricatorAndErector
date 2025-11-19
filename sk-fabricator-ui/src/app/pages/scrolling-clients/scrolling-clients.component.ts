import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientDetails } from '../../_models';
import { ClientService } from '../../_services/client.service';

@Component({
  selector: 'app-scrolling-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scrolling-clients.component.html',
  styleUrls: ['./scrolling-clients.component.scss']
})
export class ScrollingClientsComponent implements OnInit {
  private clientService = inject(ClientService);
  clients = signal<ClientDetails[]>([]);

  ngOnInit(): void {
    this.clientService.getClientDetails().subscribe({
      next: (clients) => this.clients.set(clients),
      error: (err) => console.error('Failed to load clients for scrolling component', err)
    });
  }
}
