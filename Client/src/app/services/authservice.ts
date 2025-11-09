import { inject, Injectable } from '@angular/core';
import { environment } from '../model/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User/User';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class Authservice {
  apiUrl = environment.apiUrl;
  http = inject(HttpClient);
  User: User | null = null;
  constructor(private router: Router) {}
  setUser(user: User | null) {
    this.User = user;
    sessionStorage.setItem('user', JSON.stringify(user));
  }
  getUser(): User | null {
    if (this.User != null) return this.User;
    const saved = sessionStorage.getItem('user');
    if (saved) this.User = JSON.parse(saved);
    return this.User;
  }
  loadUserProfile() {
    this.http.get<User>(`${this.apiUrl}/users/profile`, { withCredentials: true }).subscribe({
      next: (user) => {
        console.log('User profile loaded:', user);
        this.setUser(user);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error loading user profile:', error);
        this.setUser(null);
      },
    });
  }
  SignIn(email: string, password: string) {
    return this.http.post<any>(
      `${this.apiUrl}/account/signin`,
      { email, password },
      { withCredentials: true }
    );
  }
  SignUp(fullName: string, email: string, password: string) {
    return this.http.post<any>(
      `${this.apiUrl}/account/signup`,
      { fullName, email, password },
      { withCredentials: true }
    );
  }
  SignOut() {
    if (this.getUser() == null) return;
    this.http.delete(`${this.apiUrl}/account/signout`, { withCredentials: true }).subscribe({
      next: () => {
        sessionStorage.removeItem('user');
        window.location.reload();
      },
    });
  }
}
