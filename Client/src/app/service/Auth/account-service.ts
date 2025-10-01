import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../model/User';

@Injectable({ providedIn: 'root' })
export class AccountService {
  private apiUrl = 'https://localhost:5129';

  constructor(private http: HttpClient) {}

  /** Store the token both in-memory and optionally in localStorage */
  storeToken(token: string): void {
    User.setCurrentUserFromToken(token);
    // Optional: store in localStorage if you want persistence across reloads
    console.log('Storing token in localStorage');
    localStorage.setItem('access_token', token);
  }

  /** Get the token (prefer in-memory user) */
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  /** Call backend to refresh token */
  refreshToken() {
    return this.http.post<{ token: string }>(`${this.apiUrl}/users/refresh-token`, {});
  }

  /** Clear user session */
  logout(): void {
    User.clearCurrentUser();
    localStorage.removeItem('access_token');
  }
}
