import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Standalone Components are imported directly
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  template: `
    <!-- Main layout using the standalone components -->
    <app-header></app-header>
    <main class="router-content">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    .router-content {
      min-height: 80vh; /* Ensures footer stays at the bottom */
    }
  `]
})
export class App { }
