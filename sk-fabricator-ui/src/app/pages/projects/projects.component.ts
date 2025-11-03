import { ChangeDetectionStrategy, Component, computed, signal, OnInit, inject } from '@angular/core';
import { Project } from '../../_models/data.model';
import { ProjectService } from '../../_services/project.service';
import { DataService } from '../../_services/data.service';
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
  imports: [CommonModule, FormsModule, NgClass],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent implements OnInit {
  private projectService = inject(ProjectService);
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
  showAddProjectForm = signal<boolean>(false); // New signal for form visibility
  editProject = signal<Project | null>(null); // Signal to hold the project being edited
  isEditing = computed(() => this.editProject() !== null); // Computed signal for edit mode

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
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (projects) => {
        this.projects.set(projects);
      },
      error: (err) => {
        console.error('Failed to load projects', err);
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

      this.projectService.addProject(formData).subscribe({
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

  startEdit(project: Project): void {
    this.editProject.set({ ...project }); // Create a copy to avoid direct mutation
  }

  cancelEdit(): void {
    this.editProject.set(null);
  }

  onUpdateProject(): void {
    const projectToUpdate = this.editProject();
    if (projectToUpdate && projectToUpdate.id) {
      this.projectService.updateProject(projectToUpdate.id, projectToUpdate).subscribe({
        next: (updatedProject) => {
          this.projects.update(projects =>
            projects.map(p => (p.id === updatedProject.id ? updatedProject : p))
          );
          this.cancelEdit();
        },
        error: (err) => {
          console.error('Failed to update project', err);
        }
      });
    }
  }

  onDeleteProject(projectId: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(projectId).subscribe({
        next: () => {
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

