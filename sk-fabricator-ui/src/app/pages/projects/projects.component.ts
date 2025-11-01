import { ChangeDetectionStrategy, Component, computed, signal, OnInit, inject } from '@angular/core';
import { Project } from '../../_models/data.model';
import { ApiService } from '../../api.service';
import { SectionImage } from '../../_models/section-image.model';
import { DataService } from '../../_services/data.service';
import { SectionImageManagerComponent } from '../admin/section-image-manager/section-image-manager.component';
import { AuthService } from '../../auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

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
  standalone: true,
  imports: [CommonModule, SectionImageManagerComponent, FormsModule, NgClass],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit {
  private apiService = inject(ApiService);
  private dataService = inject(DataService);
  private authService = inject(AuthService);

  isLoggedIn = toSignal(this.authService.isLoggedIn$, { initialValue: false });
  currentUserRole = toSignal(this.authService.currentUserRole$, { initialValue: null });

  isAdminOrManager = computed(() => {
    const role = this.currentUserRole();
    return role === 'Admin' || role === 'Manager';
  });

  // New project object for the form
  newProject: Project = { id: 0, title: '', description: '', category: 'Piping', image: '' };

  // Static Data & Setup
  currentYear = new Date().getFullYear();
  
  // Use the strict type for the categories array
  categories: ProjectCategory[] = ['All', 'Piping', 'Fabrication', 'Erection', 'Maintenance'];

  projects = signal<Project[]>([]); // Renamed from dynamicProjects
  headerImage = signal<string | null>(null);
  showAddProjectForm = signal<boolean>(false); // New signal for form visibility

  // State
  // The type of the signal now correctly uses the union type
  activeFilter = signal<ProjectCategory>('All'); 

  // Derived State (Computed Signal)
  filteredProjects = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'All') {
      return this.projects();
    }
    // Type check passes because 'filter' is guaranteed to be one of the literal strings
    return this.projects().filter(p => p.category === filter);
  });

  ngOnInit(): void {
    this.loadProjects(); // Load projects from API
    this.loadHeaderImage();
  }

  loadProjects(): void {
    this.apiService.getProjects().subscribe({
      next: (projects) => {
        this.projects.set(projects);
      },
      error: (err) => {
        console.error('Failed to load projects', err);
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

  toggleAddProjectForm(): void {
    this.showAddProjectForm.update(value => !value);
  }

  onAddProject(form: any, files: FileList | null): void {
    if (form.valid && files && files.length > 0) {
      const formData = new FormData();
      formData.append('title', form.value.title);
      formData.append('description', form.value.description);
      formData.append('category', form.value.category);
      formData.append('file', files[0]);

      this.apiService.addProject(formData).subscribe({
        next: (project) => {
          this.projects.update(projects => [...projects, project]);
          this.toggleAddProjectForm(); // Hide form after submission
          form.reset();
        },
        error: (err) => {
          console.error('Failed to add project', err);
        }
      });
    }
  }

  onImageUpload(projectId: number, files: FileList | null): void {
    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('projectId', projectId.toString());

      this.apiService.addProjectImage(formData).subscribe({
        next: (updatedProject) => {
          this.projects.update(projects => {
            const index = projects.findIndex(p => p.id === updatedProject.id);
            if (index !== -1) {
              projects[index] = updatedProject;
            }
            return [...projects];
          });
        },
        error: (err) => {
          console.error('Failed to upload image', err);
        }
      });
    }
  }

  onDeleteProject(projectId: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.apiService.deleteProject(projectId).subscribe({
        next: () => {
          alert('Project deleted successfully!');
          this.projects.update(projects => projects.filter(p => p.id !== projectId));
        },
        error: (err) => {
          console.error('Failed to delete project', err);
          alert('Project deletion failed!');
        }
      });
    }
  }
}

