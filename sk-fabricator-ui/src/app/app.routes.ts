
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { InquiryFormComponent } from './pages/inquiry-form/inquiry-form.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { ServicesComponent } from './services/services.component';
import { ProjectsComponent } from './projects/projects.component';
import { TeamComponent } from './team/team.component';
import { AccoladesComponent } from './accolades/accolades.component';
import { NewsletterComponent } from './newsletter/newsletter.component';

export const routes: Routes = [
	{ path: '', component: HomeComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'inquiry', component: InquiryFormComponent },
  { path: 'admin', component: AdminLoginComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'team', component: TeamComponent },
  { path: 'accolades', component: AccoladesComponent },
  { path: 'newsletter', component: NewsletterComponent },
  { path: '**', redirectTo: '' }
];
