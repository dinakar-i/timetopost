import { inject, Injectable } from '@angular/core';
import { environment } from '../model/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/User/User';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class Authservice {
  apiUrl = environment.apiUrl;
  http = inject(HttpClient);
  User: User | null = null;
  constructor(private router: Router) {}
  private getUserSession() {
    return sessionStorage.getItem('user');
  }
  private removeUserSession() {
    sessionStorage.removeItem('user');
  }
  setUser(user: User | null) {
    this.User = user;
    sessionStorage.setItem('user', JSON.stringify(user));
  }
  async getUser(): Promise<User | null> {
    const saved = this.getUserSession();
    if (saved) {
      this.User = JSON.parse(saved);
    } else {
      await this.getUserProfile();
    }

    return this.User;
  }
  private clearUserData() {
    console.log('user date cleared');
    this.User = null;
    this.removeUserSession();
  }
  async loadUserProfile() {
    const isDone = await this.getUserProfile();
    console.log('isDone', isDone);
    if (isDone) {
      this.router.navigate(['/']);
      console.log('User profile loaded successfully');
    }
  }
  private async getUserProfile(): Promise<boolean> {
    try {
      const user = await firstValueFrom(
        this.http.get<User>(`${this.apiUrl}/users/profile`, { withCredentials: true })
      );
      console.log('User data loaded');
      this.setUser(user);
      return true;
    } catch {
      this.setUser(null);
      return false;
    }
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
  async SignOut() {
    try {
      await firstValueFrom(
        this.http.delete(`${this.apiUrl}/account/signout`, { withCredentials: true })
      );
    } catch (err) {
      console.error('SignOut failed', err);
    } finally {
      this.clearUserData();
      window.location.reload();
    }
  }
}
