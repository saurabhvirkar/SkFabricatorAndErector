import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

/**
 * Define the strict union type for project categories.
 * This resolves the TypeScript error in the template by ensuring
 * the categories array and the signal match the setFilter function signature.
 */
type ProjectCategory = 'All' | 'Piping' | 'Fabrication' | 'Erection' | 'Maintenance';

interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  description: string;
  imageUrl: string;
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
export class ProjectsComponent {
  // Static Data & Setup
  currentYear = new Date().getFullYear();
  
  // Use the strict type for the categories array
  categories: ProjectCategory[] = ['All', 'Piping', 'Fabrication', 'Erection', 'Maintenance'];

  // Mock data to replace the DataService call
  private allProjects: Project[] = [
    { id: 1, title: 'Refinery Expansion Phase II', category: 'Piping', description: 'Installation of high-pressure utility and process piping in a major refinery unit.', imageUrl: 'https://placehold.co/600x400/2f4f4f/ffffff?text=Piping+Project+1' },
    { id: 2, title: 'Structural Steel Warehouse', category: 'Fabrication', description: 'Complete fabrication and delivery of structural steel for a new 50,000 sq ft warehouse.', imageUrl: 'https://placehold.co/600x400/696969/ffffff?text=Fabrication+Project+2' },
    { id: 3, title: 'Petrochemical Plant Erection', category: 'Erection', description: 'Erection of two large distillation columns and associated equipment on site.', imageUrl: 'https://placehold.co/600x400/a9a9a9/ffffff?text=Erection+Project+3' },
    { id: 4, title: 'Annual Boiler Maintenance', category: 'Maintenance', description: 'Scheduled major shutdown maintenance and overhaul for industrial boilers and heat exchangers.', imageUrl: 'https://placehold.co/600x400/20b2aa/ffffff?text=Maintenance+Project+4' },
    { id: 5, title: 'New Storage Tank Farm', category: 'Fabrication', description: 'Design, fabrication, and field-welding of three API 650 storage tanks.', imageUrl: 'https://placehold.co/600x400/4682b4/ffffff?text=Fabrication+Project+5' },
    { id: 6, title: 'Emergency Pipe Repair', category: 'Piping', description: 'Rapid response repair and replacement of a critical steam line section.', imageUrl: 'https://placehold.co/600x400/87cefa/ffffff?text=Piping+Project+6' },
  ];

  // State
  // The type of the signal now correctly uses the union type
  activeFilter = signal<ProjectCategory>('All'); 

  // Derived State (Computed Signal)
  filteredProjects = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'All') {
      return this.allProjects;
    }
    // Type check passes because 'filter' is guaranteed to be one of the literal strings
    return this.allProjects.filter(p => p.category === filter);
  });

  /**
   * Updates the active filter and triggers the computed signal to update the list.
   * @param category The category to filter by (strictly typed).
   */
  setFilter(category: ProjectCategory) {
    // This is where the fix is most effective: passing 'category' directly.
    this.activeFilter.set(category);
  }
}
