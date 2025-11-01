import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../_services/data.service';
import { ApiService } from '../../api.service';
import { TeamMember } from '../../_models/data.model';
import { SectionImage } from '../../_models/section-image.model';

interface DynamicTeamMember extends TeamMember {
  dynamicImageUrl?: string;
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  private dataService = inject(DataService);
  private apiService = inject(ApiService);

  staticTeamMembers: TeamMember[] = [];
  dynamicTeamMembers = signal<DynamicTeamMember[]>([]);

  ngOnInit(): void {
    this.staticTeamMembers = this.dataService.getTeamMembers();
    this.loadTeamImages();
  }

  loadTeamImages(): void {
    this.apiService.getSectionImagesBySectionName('TeamComponent').subscribe({
      next: (sectionImages) => {
        const combinedMembers: DynamicTeamMember[] = this.staticTeamMembers.map((member, index) => {
          const dynamicImage = sectionImages[index]; // Simple mapping by index
          return {
            ...member,
            dynamicImageUrl: dynamicImage ? dynamicImage.url : member.imageUrl // Use dynamic if available, else static
          };
        });
        this.dynamicTeamMembers.set(combinedMembers);
      },
      error: (err) => {
        console.error('Failed to load team images for TeamComponent', err);
        // Fallback to static images if API call fails
        this.dynamicTeamMembers.set(this.staticTeamMembers);
      }
    });
  }
}

