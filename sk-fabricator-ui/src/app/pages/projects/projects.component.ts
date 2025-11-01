import { ChangeDetectionStrategy, Component, computed, signal, OnInit, inject } from '@angular/core';
import { Project } from '../../_models/data.model';
import { ApiService } from '../../api.service';
import { SectionImage } from '../../_models/section-image.model';
import { DataService } from '../../_services/data.service';

/**
 * Define the strict union type for project categories.
 * This resolves the TypeScript error in the template by ensuring
 * the categories array and the signal match the setFilter function signature.
 */
type ProjectCategory = 'All' | 'Piping' | 'Fabrication' | 'Erection' | 'Maintenance';

interface DynamicProject extends Project {
  dynamicImageUrl?: string;
}

/**
 * The main application component.
 * It contains all logic and templates for the project showcase feature.
 */
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit {
  private apiService = inject(ApiService);
  private dataService = inject(DataService);

  // Static Data & Setup
  currentYear = new Date().getFullYear();
  
  // Use the strict type for the categories array
  categories: ProjectCategory[] = ['All', 'Piping', 'Fabrication', 'Erection', 'Maintenance'];

  staticProjects: Project[] = [];
  dynamicProjects = signal<DynamicProject[]>([]);
  headerImage = signal<string | null>(null);

  // State
  // The type of the signal now correctly uses the union type
  activeFilter = signal<ProjectCategory>('All'); 

  // Derived State (Computed Signal)
  filteredProjects = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'All') {
      return this.dynamicProjects();
    }
    // Type check passes because 'filter' is guaranteed to be one of the literal strings
    return this.dynamicProjects().filter(p => p.category === filter);
  });

  ngOnInit(): void {
    this.staticProjects = this.dataService.getProjects();
    this.loadProjectImages();
    this.loadHeaderImage();
  }

  loadProjectImages(): void {
    this.apiService.getSectionImagesBySectionName('ProjectsComponent').subscribe({
      next: (sectionImages) => {
        const combinedProjects: DynamicProject[] = this.staticProjects.map((project, index) => {
          const dynamicImage = sectionImages[index]; // Simple mapping by index
          return {
            ...project,
            dynamicImageUrl: dynamicImage ? dynamicImage.url : project.imageUrl // Use dynamic if available, else static
          };
        });
        this.dynamicProjects.set(combinedProjects);
      },
      error: (err) => {
        console.error('Failed to load project images for ProjectsComponent', err);
        // Fallback to static images if API call fails
        this.dynamicProjects.set(this.staticProjects.map(p => ({ ...p, dynamicImageUrl: p.imageUrl })));
      }
    });
  }

  loadHeaderImage(): void {
    this.apiService.getSectionImagesBySectionName('ProjectsComponentHeader').subscribe({
      next: (images) => {
        if (images.length > 0) {
          this.headerImage.set(images[0].url);
        }
      },
      error: (err) => {
        console.error('Failed to load header image for ProjectsComponent', err);
      }
    });
  }

  /**
   * Updates the active filter and triggers the computed signal to update the list.
   * @param category The category to filter by (strictly typed).
   */
  setFilter(category: ProjectCategory) {
    // This is where the fix is most effective: passing 'category' directly.
    this.activeFilter.set(category);
  }
}

