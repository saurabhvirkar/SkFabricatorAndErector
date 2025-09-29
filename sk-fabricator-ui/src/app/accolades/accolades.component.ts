import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accolades',
  standalone: true,
  imports: [CommonModule],
  template: '<div class="container py-5"><h2>Accolades</h2><p>Certifications and awards.</p></div>'
})
export class AccoladesComponent {}
  styleUrl: './accolades.component.scss'