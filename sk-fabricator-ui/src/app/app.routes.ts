import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: 'Home | SK Fabricator' },
    { path: 'about', loadComponent: () => import('./pages/about-details/about-details.component').then(m => m.AboutDetailsComponent), title: 'About | SK Fabricator' },
    { path: 'services', loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent), title: 'Services | SK Fabricator' },
    { path: 'projects', loadComponent: () => import('./pages/projects/projects.component').then(m => m.ProjectsComponent), title: 'Projects | SK Fabricator' },
    { path: 'clients', loadComponent: () => import('./pages/clients-details/clients-details.component').then(m => m.ClientsDetailsComponent), title: 'Clients | SK Fabricator' },
    { path: 'team', loadComponent: () => import('./pages/team/team.component').then(m => m.TeamComponent), title: 'Our Team | SK Fabricator' },
    { path: 'gallery', loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent), title: 'Gallery | SK Fabricator' },
    { path: 'admin', loadComponent: () => import('./pages/admin-login/admin-login.component').then(m => m.AdminLoginComponent), title: 'Admin Login | SK Fabricator' },
    { path: '**', redirectTo: '' } // Fallback to home
];
