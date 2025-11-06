import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../_models';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiService = inject(ApiService);

  getProjects(): Observable<Project[]> {
    return this.apiService.get<Project[]>('projects');
  }

  addProject(projectData: FormData): Observable<Project> {
    return this.apiService.post<Project>('projects', projectData, true);
  }

  addProjectImage(imageData: FormData): Observable<Project> {
    return this.apiService.post<Project>('projects/image', imageData, true);
  }

  deleteProject(projectId: number): Observable<any> {
    return this.apiService.delete<any>(`projects/${projectId}`);
  }

  updateProject(projectId: number, projectData: any): Observable<Project> {
    return this.apiService.put<Project>(`projects/${projectId}`, projectData);
  }
}
