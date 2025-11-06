import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { TeamMember } from '../../_models';
import { AuthService } from '../../auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { TeamService } from '../../_services/team.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule, FormsModule, NgClass],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  private teamService = inject(TeamService);
  private authService = inject(AuthService);

  isLoggedIn = toSignal(this.authService.isLoggedIn$, { initialValue: false });
  currentUserRole = toSignal(this.authService.currentUserRole$, { initialValue: null });

  isAdminOrManager = computed(() => {
    const role = this.currentUserRole();
    return role === 'Admin' || role === 'Manager';
  });

  teamMembers = signal<TeamMember[]>([]); // Renamed from dynamicTeamMembers
  showAddTeamMemberForm = signal<boolean>(false); // New signal for form visibility
  editTeamMember = signal<TeamMember | null>(null); // Signal to hold the team member being edited
  isEditing = computed(() => this.editTeamMember() !== null); // Computed signal for edit mode

  newTeamMember: TeamMember = { id: 0, name: '', role: '', imageUrl: '' };

  ngOnInit(): void {
    this.loadTeamMembers();
  }

  loadTeamMembers(): void {
    this.teamService.getTeamMembers().subscribe({
      next: (teamMembers) => {
        this.teamMembers.set(teamMembers);
      },
      error: (err) => {
        console.error('Failed to load team members', err);
      }
    });
  }

  toggleAddTeamMemberForm(): void {
    this.showAddTeamMemberForm.update(value => !value);
  }

  onAddTeamMember(form: any, files: FileList | null): void {
    if (form.valid && files && files.length > 0) {
      const formData = new FormData();
      formData.append('name', form.value.name);
      formData.append('role', form.value.role);
      formData.append('email', form.value.email);
      formData.append('linkedInUrl', form.value.linkedInUrl);
      formData.append('details', form.value.details);
      formData.append('file', files[0]);

      this.teamService.addTeamMember(formData).subscribe({
        next: (teamMember) => {
          this.teamMembers.update(members => [...members, teamMember]);
          this.toggleAddTeamMemberForm(); // Hide form after submission
          form.reset();
        },
        error: (err) => {
          console.error('Failed to add team member', err);
        }
      });
    }
  }

  startEdit(teamMember: TeamMember): void {
    this.editTeamMember.set({ ...teamMember }); // Create a copy to avoid direct mutation
  }

  cancelEdit(): void {
    this.editTeamMember.set(null);
  }

  onUpdateTeamMember(): void {
    const memberToUpdate = this.editTeamMember();
    if (memberToUpdate && memberToUpdate.id) {
      this.teamService.updateTeamMember(memberToUpdate.id, memberToUpdate).subscribe({
        next: (updatedMember) => {
          this.teamMembers.update(members =>
            members.map(m => (m.id === updatedMember.id ? updatedMember : m))
          );
          this.cancelEdit();
        },
        error: (err) => {
          console.error('Failed to update team member', err);
        }
      });
    }
  }

  onDeleteTeamMember(id: number): void {
    if (confirm('Are you sure you want to delete this team member?')) {
      this.teamService.deleteTeamMember(id).subscribe({
        next: () => {
          this.teamMembers.update(members => members.filter(m => m.id !== id));
        },
        error: (err) => {
          console.error('Failed to delete team member', err);
        }
      });
    }
  }

  onImageUpload(teamMemberId: number, files: FileList | null): void {
    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append('teamMemberId', teamMemberId.toString());

      this.teamService.addTeamMemberImage(formData).subscribe({
        next: (updatedTeamMember) => {
          this.teamMembers.update(members => {
            const index = members.findIndex(m => m.id === updatedTeamMember.id);
            if (index !== -1) {
              members[index] = updatedTeamMember;
            }
            return [...members];
          });
        },
        error: (err) => {
          console.error('Failed to upload image', err);
        }
      });
    }
  }
}