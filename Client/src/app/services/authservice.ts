import { inject, Injectable } from '@angular/core';
import { environment } from '../model/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User';
@Injectable({
  providedIn: 'root',
})
export class Authservice {
  apiUrl = environment.apiUrl;
  http = inject(HttpClient);
  User: User | null = null;
  setUser(user: User | null) {
    this.User = user;
  }
  getUser(): User | null {
    return this.User;
  }
  loadUserProfile() {
    this.http.get<User>(`${this.apiUrl}/users/profile`, { withCredentials: true }).subscribe({
      next: (user) => {
        console.log('User profile loaded:', user);
        this.setUser(user);
      },
      error: (error) => {
        console.error('Error loading user profile:', error);
        this.setUser(null);
      },
    });
  }
}
