import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Project } from '../../_models/data.model';

/**
 * Define the strict union type for project categories.
 * This resolves the TypeScript error in the template by ensuring
 * the categories array and the signal match the setFilter function signature.
 */
type ProjectCategory = 'All' | 'Piping' | 'Fabrication' | 'Erection' | 'Maintenance';

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
    { id: 1, title: 'Refinery Expansion Phase II', category: 'Piping', description: 'Installation of high-pressure utility and process piping in a major refinery unit.', imageUrl: 'https://images.pexels.com/photos/3838389/pexels-photo-3838389.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 2, title: 'Structural Steel Warehouse', category: 'Fabrication', description: 'Complete fabrication and delivery of structural steel for a new 50,000 sq ft warehouse.', imageUrl: 'https://images.pexels.com/photos/6077326/pexels-photo-6077326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 3, title: 'Petrochemical Plant Erection', category: 'Erection', description: 'Erection of two large distillation columns and associated equipment on site.', imageUrl: 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 4, title: 'Annual Boiler Maintenance', category: 'Maintenance', description: 'Scheduled major shutdown maintenance and overhaul for industrial boilers and heat exchangers.', imageUrl: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 5, title: 'New Storage Tank Farm', category: 'Fabrication', description: 'Design, fabrication, and field-welding of three API 650 storage tanks.', imageUrl: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
    { id: 6, title: 'Emergency Pipe Repair', category: 'Piping', description: 'Rapid response repair and replacement of a critical steam line section.', imageUrl: 'https://images.pexels.com/photos/7218569/pexels-photo-7218569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
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
