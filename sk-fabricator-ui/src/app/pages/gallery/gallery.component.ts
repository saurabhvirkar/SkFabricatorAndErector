import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

/**
 * Define the strict union type for image categories.
 * This ensures type safety and resolves the compiler error in the template.
 */
type ImageCategory = 'All' | 'Piping' | 'Fabrication' | 'Erection' | 'Maintenance';

interface Image {
  id: number;
  url: string;
  alt: string;
  category: ImageCategory;
}

/**
 * The main application component, now serving as the Work Gallery showcase.
 * It contains all logic and templates for the feature.
 */
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
  // Static Data & Setup
  currentYear = new Date().getFullYear();
  
  // Use the strict type for the categories array
  categories: ImageCategory[] = ['All', 'Piping', 'Fabrication', 'Erection', 'Maintenance'];

  // Gallery image data (replacing the previous 'allProjects')
  private allImages: Image[] = [ // Updated with premium, relevant images
    { id: 1, url: 'https://images.pexels.com/photos/3838389/pexels-photo-3838389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Industrial Piping System', category: 'Piping' },
    { id: 2, url: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Steel Structure Erection', category: 'Erection' },
    { id: 3, url: 'https://images.pexels.com/photos/7218525/pexels-photo-7218525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Precision Welding Fabrication', category: 'Fabrication' },
    { id: 4, url: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'On-site Equipment Maintenance', category: 'Maintenance' },
    { id: 5, url: 'https://images.pexels.com/photos/4513940/pexels-photo-4513940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Crane Lifting Steel Beam', category: 'Erection' },
    { id: 6, url: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Storage Tank Fabrication', category: 'Fabrication' },
    { id: 7, url: 'https://images.pexels.com/photos/7218569/pexels-photo-7218569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Complex Pipe Network', category: 'Piping' },
    { id: 8, url: 'https://images.pexels.com/photos/8346830/pexels-photo-8346830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', alt: 'Industrial Plant Maintenance', category: 'Maintenance' },
  ];

  // State
  activeFilter = signal<ImageCategory>('All'); 
  selectedImage = signal<Image | null>(null);

  // Derived State (Computed Signal)
  filteredImages = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'All') {
      return this.allImages;
    }
    // Filter logic uses the strictly typed signal value
    return this.allImages.filter(img => img.category === filter);
  });

  /**
   * Updates the active filter and triggers the computed signal to update the list.
   * @param category The category to filter by (strictly typed).
   */
  setFilter(category: ImageCategory) {
    // FIX: The component logic now correctly handles the filtering based on the strong type.
    this.activeFilter.set(category);
  }

  /**
   * Opens the lightbox with the selected image.
   * @param image The image to display in the lightbox.
   */
  openLightbox(image: Image) {
    this.selectedImage.set(image);
  }

  /**
   * Closes the lightbox.
   */
  closeLightbox() {
    this.selectedImage.set(null);
  }
}