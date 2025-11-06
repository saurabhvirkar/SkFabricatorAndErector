import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Accolade } from '../_models/accolade.model';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accolades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accolades.component.html',
  styleUrls: ['./accolades.component.scss']
})
export class AccoladesComponent implements OnInit, OnDestroy {
  accolades: Accolade[] = [
    { id: 1, icon: '🏆', title: 'Years of Service', count: 15, suffix: '+' },
    { id: 2, icon: '🧱', title: 'Projects Completed', count: 500, suffix: '+' },
    { id: 3, icon: '⭐', title: 'Client Satisfaction', count: 98, suffix: '%' }
  ];

  isAdmin = false;
  editMode = false;
  originalAccolades: Accolade[] = [];
  private authSubscription: Subscription | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.currentUserRole$.subscribe(role => {
      this.isAdmin = role === 'Admin';
      if (!this.isAdmin) {
        this.editMode = false; // Exit edit mode if not admin
      }
    });
    this.originalAccolades = JSON.parse(JSON.stringify(this.accolades));
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (!this.editMode) {
      this.accolades = JSON.parse(JSON.stringify(this.originalAccolades));
    }
  }

  saveChanges(): void {
    this.originalAccolades = JSON.parse(JSON.stringify(this.accolades));
    this.editMode = false;
  }
}
