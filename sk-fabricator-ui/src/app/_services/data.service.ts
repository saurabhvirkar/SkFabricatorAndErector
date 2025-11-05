import { Injectable } from '@angular/core';
import { Accolade, Project,  TeamMember } from '../_models/data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private accolades: Accolade[] = [
    { id: 1, icon: '🏆', title: 'Years of Service', count: 15, suffix: '+' },
    { id: 2, icon: '🧱', title: 'Projects Completed', count: 500, suffix: '+' },
    { id: 3, icon: '⭐', title: 'Client Satisfaction', count: 98, suffix: '%' }
  ];

  public contact = {
    phoneNumbers: ['+91 9130 01 2070', '+91 9552 03 4884', '+91 8483 80 6320'],
    email: 'skfabricator2070@gmail.com',
    address: '17/3/1 Shiv Colony, Wakad Rd, Ganesh Nagar, Thergaon, Pune, Maharashtra 411033'
  };

  constructor() { }
  getAccolades(): Accolade[] { return this.accolades; }
}
