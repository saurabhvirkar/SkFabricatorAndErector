import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Accolade, Photo } from '../_models';
import { GalleryService } from '../_services/gallery.service';

@Component({
  selector: 'app-accolades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accolades.component.html',
  styleUrls: ['./accolades.component.scss'],
})
export class AccoladesComponent implements OnInit {
  private galleryService = inject(GalleryService);
  accolades: Accolade[] = [
    { id: 1, icon: '🏆', title: 'Years of Service', count: 15, suffix: '+' },
    { id: 2, icon: '🧱', title: 'Projects Completed', count: 500, suffix: '+' },
    { id: 3, icon: '⭐', title: 'Client Satisfaction', count: 98, suffix: '%' }
  ];
  aboutSliderImages: Photo[] = [];

  ngOnInit(): void {
    this.galleryService.getPhotos().subscribe({
      next: (images) => {
        this.aboutSliderImages = images.filter(image => image.isAboutSlider);
      },
      error: (error) => {
        console.error('Error fetching about slider images:', error);
      }
    });
  }
}
