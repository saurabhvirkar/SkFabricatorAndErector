import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-accolades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accolades.component.html',
  styleUrls: ['./accolades.component.scss'],
})
export class AccoladesComponent {
  private dataService = inject(DataService);
  accolades = this.dataService.getAccolades();
}
