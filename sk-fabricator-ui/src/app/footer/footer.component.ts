// src/app/footer/footer.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Used for routerLink in template

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}