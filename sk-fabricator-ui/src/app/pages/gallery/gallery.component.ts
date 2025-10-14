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
  private allImages: Image[] = [
    { id: 1, url: 'https://placehold.co/600x400/374151/ffffff?text=Piping+Work', alt: 'Piping Installation', category: 'Piping' },
    { id: 2, url: 'https://placehold.co/600x400/374151/ffffff?text=Erection+Crane', alt: 'Equipment Erection', category: 'Erection' },
    { id: 3, url: 'https://placehold.co/600x400/374151/ffffff?text=Tank+Fabrication', alt: 'Storage Tank Fabrication', category: 'Fabrication' },
    { id: 4, url: 'https://placehold.co/600x400/374151/ffffff?text=Onsite+Welding', alt: 'Onsite Welding Job', category: 'Maintenance' },
    { id: 5, url: 'https://placehold.co/600x400/374151/ffffff?text=Industrial+Structure', alt: 'New Structure', category: 'Fabrication' },
    { id: 6, url: 'https://placehold.co/600x400/374151/ffffff?text=Maintenance+Crew', alt: 'Shutdown Maintenance', category: 'Maintenance' },
  ];

  // State
  activeFilter = signal<ImageCategory>('All'); 

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
}
