import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../auth.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

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
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoggedIn$ = this.authService.isLoggedIn$;
  currentUserRole$ = this.authService.currentUserRole$;
  isMenuOpen = false;

  // Base navigation items
  baseNavItems: NavItem[] = [
    { label: 'Home', link: '/' },
    { label: 'About', link: '/about' },
    { label: 'Services', link: '/services' },
    { label: 'Projects', link: '/projects' },
    { label: 'Clients', link: '/clients' },
    { label: 'Team', link: '/team' },
    { label: 'Gallery', link: '/gallery' },
  ];

  // Admin-only navigation item
  adminNavItem: NavItem = { label: 'Inquiries', link: '/inquiries' };

  // Combine base and admin items based on login state
  navItems$ = combineLatest([
    this.authService.isLoggedIn$,
    this.authService.currentUserRole$
  ]).pipe(
    map(([isLoggedIn, role]) => {
      const isAdminOrManager = role === 'admin' || role === 'manager';
      return isLoggedIn && isAdminOrManager ? [...this.baseNavItems, this.adminNavItem] : this.baseNavItems;
    })
  );

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']); // Navigate to home after logout
    this.isMenuOpen = false; // Close mobile menu on logout
  }
}
