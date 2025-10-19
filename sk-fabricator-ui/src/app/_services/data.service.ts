import { Injectable } from '@angular/core';
import { Accolade, ClientDetails, Project, Service, TeamMember } from '../_models/data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private teamMembers: TeamMember[] = [
    { id: 1, name: 'Mr. Sudhakar Kale', role: 'Founder & CEO', imageUrl: 'https://placehold.co/300x300/1e40af/ffffff?text=Sudhakar+Kale' },
    { id: 2, name: 'Mr. Shripad Kale', role: 'Chief Engineer', imageUrl: 'https://placehold.co/300x300/1e40af/ffffff?text=Shripad+Kale' },
    { id: 3, name: 'Mr. Ganesh Dhanorkar', role: 'Project Manager', imageUrl: 'https://placehold.co/300x300/1e40af/ffffff?text=Ganesh+D' },
    { id: 4, name: 'Mr. Yogesh Kandurke', role: 'Site Supervisor', imageUrl: 'https://placehold.co/300x300/1e40af/ffffff?text=Yogesh+K' },
  ];

  private services: Service[] = [
    {
      id: 1,
      name: 'Mechanical & Industrial Piping',
      summary: 'Industrial piping contracting and fabrication for SS, Fire, Gas (PNG/LPG), Petrol/Diesel, Steam, Nitrogen, Chiller & Air lines. Jacketed piping design & installation.',
      icon: '🔧'
    },
    {
      id: 2,
      name: 'Structure Fabrication & Erection',
      summary: 'Structural steel fabrication and erection (I-Beam, angles, channels, platforms, pipe supports, access ladders) for plants and buildings.',
      icon: '🏗️'
    },
    {
      id: 3,
      name: 'Storage Tank Manufacturing',
      summary: 'Design, manufacture and installation of MS/SS storage tanks — oil, water, petroleum, juice, low & high pressure tanks, square and cylindrical tanks.',
      icon: '🛢️'
    },
    {
      id: 4,
      name: 'Plant Maintenance & Shutdown Works',
      summary: 'Onsite repair, maintenance and major shutdown services for rotating and reciprocating equipment, including bearing replacement, seal/coupling work, onsite machining and welding.',
      icon: '🔩'
    },
    {
      id: 5,
      name: 'Specialized Insulation',
      summary: 'Pipe & tank insulation: steam insulation, hot & cold insulation, reactor/tank insulation and Armaflex cold insulation to reduce heat loss and energy cost.',
      icon: '🧰'
    },
    {
      id: 6,
      name: 'SS Magnetic Filters',
      summary: 'Magnetic filters for separation of iron particles from liquid/semi-liquid flows — easy to clean and available in varied sizes.',
      icon: '🧲'
    }
  ];

  private clientDetails: ClientDetails[] = [
    { id: 1, name: 'Avery Dennison', imageUrl: 'https://placehold.co/300x300/a3a3a3/ffffff?text=Avery' },
    { id: 2, name: 'ARAI', imageUrl: 'https://placehold.co/300x300/a3a3a3/ffffff?text=ARAI' },
    { id: 3, name: 'Royal AGRO', imageUrl: 'https://placehold.co/300x300/a3a3a3/ffffff?text=Royal+AGRO' },
    { id: 4, name: 'Globe Gas', imageUrl: 'https://placehold.co/300x300/a3a3a3/ffffff?text=Globe+Gas' },
    { id: 5, name: 'KS Engineers', imageUrl: 'https://placehold.co/300x300/a3a3a3/ffffff?text=KS+Engineers' },
    { id: 6, name: 'HORIBA', imageUrl: 'https://placehold.co/300x300/a3a3a3/ffffff?text=HORIBA' },
    { id: 7, name: 'VOLTAS', imageUrl: 'https://placehold.co/300x300/a3a3a3/ffffff?text=VOLTAS' },
    { id: 8, name: 'Inspired Control Systems', imageUrl: 'https://placehold.co/300x300/a3a3a3/ffffff?text=Inspired+CS' }
  ];

  private projects: Project[] = [
    { id: 1, title: 'Chemical Plant Piping', category: 'Piping', description: 'Design and installation of high-pressure industrial piping systems.', imageUrl: 'https://placehold.co/600x400/059669/ffffff?text=Piping+Project+1' },
    { id: 2, title: 'Structural Steel Erection', category: 'Erection', description: 'Erection of heavy steel structures for a new manufacturing unit.', imageUrl: 'https://placehold.co/600x400/059669/ffffff?text=Erection+Project+2' },
    { id: 3, title: 'Tank Fabrication & Installation', category: 'Fabrication', description: 'Fabrication of storage tanks for hazardous chemicals.', imageUrl: 'https://placehold.co/600x400/059669/ffffff?text=Fabrication+Project+3' }
  ];

  private accolades: Accolade[] = [
    { id: 1, icon: '🏆', title: 'Years of Service', count: 15, suffix: '+' },
    { id: 2, icon: '🧱', title: 'Projects Completed', count: 500, suffix: '+' },
    { id: 3, icon: '⭐', title: 'Client Satisfaction', count: 98, suffix: '%' }
  ];

  public contact = {
    phone: '+91 9130 01 2070 / +91 9552 03 4884',
    email: 'skfabricator2070@gmail.com',
    address: '17/3/1 Wakad Road, Thergaon, Pune-33'
  };

  constructor() { }

  getAccolades(): Accolade[] { return this.accolades; }
  getTeamMembers(): TeamMember[] { return this.teamMembers; }
  getClientDetails(): ClientDetails[] { return this.clientDetails; }
  getProjects(): Project[] { return this.projects; }
  getServices(): Service[] { return this.services; }
}
