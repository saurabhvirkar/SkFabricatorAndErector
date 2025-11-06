import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../_services/data.service';
import { Photo } from '../_models';
import { GalleryService } from '../_services/gallery.service';

@Component({
  selector: 'app-accolades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accolades.component.html',
  styleUrls: ['./accolades.component.scss'],
})
export class AccoladesComponent implements OnInit {
  private dataService = inject(DataService);
  private galleryService = inject(GalleryService);
  accolades = this.dataService.getAccolades();
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
