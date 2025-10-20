import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

// Define the interface to clearly define the expected structure (optional: class)
interface NavItem {
  label: string;
  link: string;
  // The 'class' property is optional for custom styling if needed later
  class?: string; 
}

@Component({
  selector: 'app-header',
  standalone: true,
  // 💡 Add RouterLinkActive to imports for active link styling
  imports: [CommonModule, RouterLink, RouterLinkActive], 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  // Use the defined interface for better type checking
  navItems: NavItem[] = [ 
    { label: 'Home', link: '/' },
    { label: 'About', link: '/about' },
    { label: 'Services', link: '/services' },
    { label: 'Projects', link: '/projects' },
    { label: 'Clients', link: '/clients' },
    { label: 'Team', link: '/team' },
    { label: 'Gallery', link: '/gallery' },
    // You could add an item with a class like this:
    // { label: 'Admin', link: '/admin', class: 'border-2 border-red-500' }
  ];
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}