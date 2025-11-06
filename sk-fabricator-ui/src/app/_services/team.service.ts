import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TeamMember } from '../_models';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiService = inject(ApiService);

  getTeamMembers(): Observable<TeamMember[]> {
    return this.apiService.get<TeamMember[]>('team');
  }

  addTeamMember(teamMemberData: FormData): Observable<TeamMember> {
    return this.apiService.post<TeamMember>('team', teamMemberData, true);
  }

  deleteTeamMember(id: number): Observable<any> {
    return this.apiService.delete<any>(`team/${id}`);
  }

  addTeamMemberImage(imageData: FormData): Observable<TeamMember> {
    return this.apiService.post<TeamMember>('team/add-image', imageData, true);
  }

  updateTeamMember(id: number, teamMemberData: TeamMember): Observable<TeamMember> {
    return this.apiService.put<TeamMember>(`team/${id}`, teamMemberData);
  }
}