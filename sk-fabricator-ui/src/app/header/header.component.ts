import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  navItems = [
    { label: 'Home', link: '/' },
    { label: 'Services', link: '/services' },
    { label: 'Projects', link: '/projects' },
    { label: 'Team', link: '/team' },
    { label: 'Gallery', link: '/gallery' },
    // NEW: Inquiry tab pointing to the section on the services page
    { label: 'Inquiry', link: '/services#inquiry' }, 
    // Hidden login link for administration access
    { label: 'Login', link: '/admin', class: 'hidden md:block' }
  ];
  isMenuOpen = false;
}
