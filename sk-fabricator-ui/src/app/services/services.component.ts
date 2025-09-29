import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  services: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getServices().subscribe({
      next: (data) => this.services = data,
      error: () => this.services = []
    });
  }
}
