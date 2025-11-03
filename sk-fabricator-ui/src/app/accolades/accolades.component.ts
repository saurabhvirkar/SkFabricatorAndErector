import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../_services/data.service';
import { ApiService } from '../api.service';
import { Photo } from '../_models/photo.model';

@Component({
  selector: 'app-accolades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accolades.component.html',
  styleUrls: ['./accolades.component.scss'],
})
export class AccoladesComponent implements OnInit {
  private dataService = inject(DataService);
  private apiService = inject(ApiService);
  accolades = this.dataService.getAccolades();
  aboutSliderImages: Photo[] = [];

  ngOnInit(): void {
    this.apiService.getPhotos().subscribe({
      next: (images) => {
        this.aboutSliderImages = images.filter(image => image.isAboutSlider);
      },
      error: (error) => {
        console.error('Error fetching about slider images:', error);
      }
    });
  }
}
