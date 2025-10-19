import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../_services/data.service';

@Component({
  selector: 'app-about-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-details.component.html',
  styleUrls: ['./about-details.component.scss'],
})
export class AboutDetailsComponent {
  // Component setup
  private dataService = inject(DataService);
}