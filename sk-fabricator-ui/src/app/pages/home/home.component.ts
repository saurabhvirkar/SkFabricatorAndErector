import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccoladesComponent } from '../../accolades/accolades.component';
import { InquiryFormComponent } from '../../inquiry-form/inquiry-form.component';
import { DataService } from '../../_services/data.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AccoladesComponent, InquiryFormComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private dataService = inject(DataService);
  featuredServices = this.dataService.getServices().slice(0, 3);
}
