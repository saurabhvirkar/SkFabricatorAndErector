import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InquiryFormComponent } from '../inquiry-form/inquiry-form.component';

// Define the Service interface to include imageUrl
interface Service {
  id: number;
  name: string;
  summary: string;
  icon: string;
  imageUrl: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, InquiryFormComponent],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  // Added ChangeDetectionStrategy.OnPush
  changeDetection: ChangeDetectionStrategy.OnPush, 
})
export class ServicesComponent {
  // Local service data with added imageUrl properties
  allServices: Service[] = [ // Updated with premium, relevant images
    { id: 1, name: 'Structural Fabrication', summary: 'High-precision fabrication of steel structures, from simple frames to complex industrial modules.', icon: '🔧', imageUrl: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 2, name: 'Piping Solutions', summary: 'Comprehensive services for process and utility piping, including design, fabrication, and installation.', icon: '🔩', imageUrl: 'https://images.pexels.com/photos/3838389/pexels-photo-3838389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 3, name: 'Site Erection', summary: 'Safe and efficient on-site erection of heavy equipment, steel structures, and modular assemblies.', icon: '🏗️', imageUrl: 'https://images.pexels.com/photos/4513940/pexels-photo-4513940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 4, name: 'Plant Maintenance', summary: 'Reliable shutdown, turnaround, and routine maintenance services to ensure operational continuity.', icon: '⚙️', imageUrl: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }
  ];
}