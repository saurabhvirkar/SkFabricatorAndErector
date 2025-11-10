import { Component, inject, HostListener } from '@angular/core'; // 👈 ADD HostListener
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

  isScrolled = false; // 👈 ADD this property

  // Base navigation items
  baseNavItems: NavItem[] = [
    { label: 'Home', link: '/' },
    { label: 'About', link: '/about' },
    { label: 'Services', link: '/services' },
    { label: 'Projects', link: '/projects' },
    { label: 'Clients', link: '/clients' },
    { label: 'Team', link: '/team' },
    { label: 'Gallery', link: '/gallery' },
    { label: 'Contact Us', link: '/contact-us' },
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

  // 👇 ADD this scroll listener method
  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const verticalOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // You can change '50' to a larger number if you want the user to scroll more before it shrinks
    this.isScrolled = verticalOffset > 50; 
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']); // Navigate to home after logout
    this.isMenuOpen = false; // Close mobile menu on logout
  }
}