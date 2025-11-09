import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutDetailsComponent } from './pages/about-details/about-details.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { TeamComponent } from './pages/team/team.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { InquiryDetailsComponent } from './pages/inquiry-details/inquiry-details.component';
import { OurServicesComponent } from './pages/our-services/our-services.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { authGuard } from './auth.guard';
import { ClientsDetailsComponent } from './pages/clients-details/clients-details.component';




export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: AdminLoginComponent }, 
  { 
    path: 'inquiries',
    component: InquiryDetailsComponent, 
    canActivate: [authGuard],
    data: { roles: ['admin', 'manager'] }
  },
  { path: 'about', component: AboutDetailsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'team', component: TeamComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'services', component: OurServicesComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'clients', component: ClientsDetailsComponent },

];