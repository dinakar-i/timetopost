import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Authservice } from '../services/authservice';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  isPasswordVisible = false;
  email: string = '';
  password: string = '';
  authservice = inject(Authservice);
  router = inject(Router);
  errormessage: string = 'Something went wrong! Please try again.';
  showError: boolean = false;
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  goBack(): void {
    //  window.history.back();
    this.router.navigate(['/']);
  }
  showErrorMessage(message: string): void {
    this.errormessage = message;
    this.showError = true;
  }
  hideErrorMessage(): void {
    this.showError = false;
  }
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  submitForm(): void {
    if (this.email.length === 0 || this.password.length === 0) {
      this.showErrorMessage('Email and Password cannot be empty.');
      return;
    }
    if (!this.validateEmail(this.email)) {
      this.showErrorMessage('Invalid email format');
      return;
    }
    this.hideErrorMessage();
    this.authservice.SignIn(this.email, this.password).subscribe({
      next: (res) => {
        this.hideErrorMessage();
        console.log(res);
        this.authservice.loadUserProfile();
      },
      error: (error) => {
        this.showErrorMessage(error.error);
      },
    });
  }
}
