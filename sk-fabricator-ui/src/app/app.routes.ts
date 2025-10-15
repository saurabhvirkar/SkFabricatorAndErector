import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { TeamComponent } from './pages/team/team.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { ServicesComponent } from './pages/services/services.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, title: 'Home | SK Fabricator' },
    { path: 'services', component: ServicesComponent, title: 'Services | SK Fabricator' },
    { path: 'projects', component: ProjectsComponent, title: 'Projects | SK Fabricator' },
    { path: 'team', component: TeamComponent, title: 'Our Team | SK Fabricator' },
    { path: 'gallery', component: GalleryComponent, title: 'Gallery | SK Fabricator' },
    { path: 'admin', component: AdminLoginComponent, title: 'Admin Login | SK Fabricator' },
    { path: '**', redirectTo: '' } // Fallback to home
];
