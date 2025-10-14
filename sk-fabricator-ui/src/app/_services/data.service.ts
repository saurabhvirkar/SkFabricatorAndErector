import { Injectable } from '@angular/core';
import { Accolade, Project, Service, TeamMember } from '../_models/data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Mock Data
  private teamMembers: TeamMember[] = [
    { id: 1, name: 'S.K. Sharma', role: 'Founder & CEO', imageUrl: 'https://placehold.co/300x300/1e40af/ffffff?text=CEO' },
    { id: 2, name: 'Ravi Kumar', role: 'Chief Engineer', imageUrl: 'https://placehold.co/300x300/1e40af/ffffff?text=Engineer' },
    { id: 3, name: 'Anjali Desai', role: 'Project Manager', imageUrl: 'https://placehold.co/300x300/1e40af/ffffff?text=Manager' },
  ];

  private projects: Project[] = [
    { id: 1, title: 'Chemical Plant Piping', category: 'Piping', description: 'Design and installation of high-pressure industrial piping systems.', imageUrl: 'https://placehold.co/600x400/059669/ffffff?text=Piping+Project+1' },
    { id: 2, title: 'Structural Steel Erection', category: 'Erection', description: 'Erection of heavy steel structures for a new manufacturing unit.', imageUrl: 'https://placehold.co/600x400/059669/ffffff?text=Erection+Project+2' },
    { id: 3, title: 'Tank Fabrication & Installation', category: 'Fabrication', description: 'Fabrication of storage tanks for hazardous chemicals.', imageUrl: 'https://placehold.co/600x400/059669/ffffff?text=Fabrication+Project+3' },
  ];

  private services: Service[] = [
    { id: 1, name: 'Industrial Piping', summary: 'Contracting for all types of high-tolerance piping.', icon: 'pipe-wrench' },
    { id: 2, name: 'Structure Fabrication', summary: 'Expert fabrication of structural steel components.', icon: 'crane' },
    { id: 3, name: 'Equipment Erection', summary: 'Precise and safe installation of heavy machinery.', icon: 'cog' },
    { id: 4, name: 'Plant Maintenance', summary: 'On-site repair and maintenance during shutdowns.', icon: 'tools' },
  ];

  private accolades: Accolade[] = [
    { id: 1, icon: 'shield', title: 'Years of Service', count: 15, suffix: '+' },
    { id: 2, icon: 'factory', title: 'Projects Completed', count: 500, suffix: '+' },
    { id: 3, icon: 'star', title: 'Client Satisfaction', count: 98, suffix: '%' },
  ];

  constructor() { }

  getAccolades(): Accolade[] {
    return this.accolades;
  }

  getTeamMembers(): TeamMember[] {
    return this.teamMembers;
  }

  getProjects(): Project[] {
    return this.projects;
  }

  getServices(): Service[] {
    return this.services;
  }
}
