import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  photos = [
    { url: 'assets/sk-logo.jpg', caption: 'Company Logo' },
    { url: 'assets/photo1.jpg', caption: 'Machine Installation' },
    { url: 'assets/photo2.jpg', caption: 'Industrial Piping' },
    { url: 'assets/photo3.jpg', caption: 'Fabrication Work' },
    { url: 'assets/photo4.jpg', caption: 'Client Site' }
  ];
}
