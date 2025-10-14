import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../_services/data.service';
import { InquiryFormComponent } from '../inquiry-form/inquiry-form.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, InquiryFormComponent],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent {
  private dataService = inject(DataService);
  allServices = this.dataService.getServices();
}
