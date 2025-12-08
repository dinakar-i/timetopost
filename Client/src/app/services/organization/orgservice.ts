import { inject, Injectable } from '@angular/core';
import { environment } from '../../model/environment';
import { HttpClient } from '@angular/common/http';
import { Authservice } from '../authservice';
import { Router } from '@angular/router';
import { Organization } from '../../model/Organization/Organization';
import { firstValueFrom, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Orgservice {
  apiUrl = environment.apiUrl;
  http = inject(HttpClient);
  authservice = inject(Authservice);
  router = inject(Router);
  organizations: Organization[] | null = null;
  async loadOrganizations(): Promise<Organization[] | null> {
    const obs = this.getOrganization();
    if (!obs) return null;
    try {
      this.organizations = await firstValueFrom(obs);
      console.log('Organizations loaded', this.organizations);
      return this.organizations;
    } catch (error) {
      console.error('Error loading organizations', error);
      return null;
    }
  }
  private getOrganization(): Observable<Organization[]> | null {
    if (!this.authservice.User) {
      this.router.navigate(['/signin']);
      return null;
    }
    return this.http.get<Organization[]>(
      `${this.apiUrl}/Organization/${this.authservice.User?.id}`,
      {
        withCredentials: true,
      }
    );
  }
  public addUserToOrganization(
    userEmail: string,
    userRole: string,
    organizationId: number,
    ownerId: number
  ): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/Organization/adduser`,
      {}, // body
      {
        params: {
          userEmail,
          organizationId,
          role: userRole,
          ownerId,
        },
        withCredentials: true, // correct position
      }
    );
  }
}
