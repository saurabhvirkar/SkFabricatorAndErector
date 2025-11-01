import { Injectable } from '@angular/core';
import { Accolade, ClientDetails, Project, Service, TeamMember } from '../_models/data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private teamMembers: TeamMember[] = [
    { id: 1, name: 'Mr. Sudhakar Kale', role: 'Founder & CEO', imageUrl: 'https://images.pexels.com/photos/8867432/pexels-photo-8867432.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 2, name: 'Mr. Shripad Kale', role: 'Chief Engineer', imageUrl: 'https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 3, name: 'Mr. Ganesh Dhanorkar', role: 'Project Manager', imageUrl: 'https://images.pexels.com/photos/845457/pexels-photo-845457.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 4, name: 'Mr. Yogesh Kandurke', role: 'Site Supervisor', imageUrl: 'https://images.pexels.com/photos/8993444/pexels-photo-8993444.jpeg?auto=compress&cs=tinysrgb&w=400' },
  ];

  private services: Service[] = [
    {
      id: 1,
      name: 'Mechanical & Industrial Piping',
      summary: 'Industrial piping contracting and fabrication for SS, Fire, Gas (PNG/LPG), Petrol/Diesel, Steam, Nitrogen, Chiller & Air lines. Jacketed piping design & installation.',
      icon: '🔧',
      imageUrl: 'https://images.pexels.com/photos/459762/pexels-photo-459762.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 2,
      name: 'Structure Fabrication & Erection',
      summary: 'Structural steel fabrication and erection (I-Beam, angles, channels, platforms, pipe supports, access ladders) for plants and buildings.',
      icon: '🏗️',
      imageUrl: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 3,
      name: 'Storage Tank Manufacturing',
      summary: 'Design, manufacture and installation of MS/SS storage tanks — oil, water, petroleum, juice, low & high pressure tanks, square and cylindrical tanks.',
      icon: '🛢️',
      imageUrl: 'https://images.pexels.com/photos/3807743/pexels-photo-3807743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 4,
      name: 'Plant Maintenance & Shutdown Works',
      summary: 'Onsite repair, maintenance and major shutdown services for rotating and reciprocating equipment, including bearing replacement, seal/coupling work, onsite machining and welding.',
      icon: '🔩',
      imageUrl: 'https://images.pexels.com/photos/8346833/pexels-photo-8346833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 5,
      name: 'Specialized Insulation',
      summary: 'Pipe & tank insulation: steam insulation, hot & cold insulation, reactor/tank insulation and Armaflex cold insulation to reduce heat loss and energy cost.',
      icon: '🧰',
      imageUrl: 'https://images.pexels.com/photos/8346761/pexels-photo-8346761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 6,
      name: 'SS Magnetic Filters',
      summary: 'Magnetic filters for separation of iron particles from liquid/semi-liquid flows — easy to clean and available in varied sizes.',
      icon: '🧲',
      imageUrl: 'https://images.pexels.com/photos/5969793/pexels-photo-5969793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  private clientDetails: ClientDetails[] = [
    { id: 1, name: 'Avery Dennison', imageUrl: 'https://logo.clearbit.com/averydennison.com' },
    { id: 2, name: 'ARAI', imageUrl: 'https://logo.clearbit.com/araiindia.com' },
    { id: 3, name: 'Royal AGRO', imageUrl: 'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 4, name: 'Globe Gas', imageUrl: 'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 5, name: 'KS Engineers', imageUrl: 'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=400' },
    { id: 6, name: 'HORIBA', imageUrl: 'https://logo.clearbit.com/horiba.com' },
    { id: 7, name: 'VOLTAS', imageUrl: 'https://logo.clearbit.com/voltas.com' },
    { id: 8, name: 'Inspired Control Systems', imageUrl: 'https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg?auto=compress&cs=tinysrgb&w=400' }
  ];

  private projects: Project[] = [
    { id: 1, title: 'Chemical Plant Piping', category: 'Piping', description: 'Installation of high-pressure stainless steel piping systems for a chemical processing plant.', image: 'https://images.pexels.com/photos/1267438/pexels-photo-1267438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 2, title: 'Warehouse Structural Erection', category: 'Erection', description: 'Erection of heavy steel framework for a new 50,000 sq. ft. manufacturing unit.', image: 'https://images.pexels.com/photos/7218525/pexels-photo-7218525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 3, title: 'Oil Storage Tank Fabrication', category: 'Fabrication', description: 'Complete fabrication and on-site assembly of large-capacity crude oil storage tanks.', image: 'https://images.pexels.com/photos/289824/pexels-photo-289824.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 4, title: 'Power Plant Maintenance', category: 'Maintenance', description: 'Turbine and generator maintenance during a scheduled plant shutdown, ensuring operational reliability.', image: 'https://images.pexels.com/photos/256517/pexels-photo-256517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 5, title: 'Automated Factory Assembly Line', category: 'Erection', description: 'Installation and commissioning of a fully automated robotic assembly line.', image: 'https://images.pexels.com/photos/4475523/pexels-photo-4475523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    { id: 6, title: 'Gas Pipeline Network', category: 'Piping', description: 'Fabrication and laying of a cross-country natural gas pipeline network.', image: 'https://images.pexels.com/photos/247600/pexels-photo-247600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }
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
