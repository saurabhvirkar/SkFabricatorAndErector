import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getProjects().subscribe({
      next: (data) => this.projects = data,
      error: () => this.projects = []
    });
  }
}
