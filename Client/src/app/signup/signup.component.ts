import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Authservice } from '../services/authservice';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  isPasswordVisible = false;
  isConfirmPasswordVisible = false;
  email: string = '';
  firstname: string = '';
  lastname: string = '';
  password: string = '';
  confirmpassword: string = '';
  errormessage: string = 'Something went wrong! Please try again.';
  showError: boolean = false;
  authservice = inject(Authservice);
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  toggleConfirmPasswordVisibility(): void {
    this.isConfirmPasswordVisible = !this.isConfirmPasswordVisible;
  }
  goBack(): void {
    window.history.back();
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
  validatePassword(password: string, confirmpassword: string): boolean {
    return password.length > 8 && confirmpassword === password;
  }
  SignUp(): void {
    var fullname = this.firstname + ' ' + this.lastname;
    if (
      this.password.length === 0 ||
      this.confirmpassword.length === 0 ||
      this.email.length == 0 ||
      this.firstname.length === 0 ||
      this.lastname.length === 0
    ) {
      this.showErrorMessage('All fields must be filled!.');
      return;
    }
    if (!this.validateEmail(this.email)) {
      this.showErrorMessage('Invalid email format!.');
      return;
    }
    if (!this.validatePassword(this.password, this.confirmpassword)) {
      this.showErrorMessage('Password must be at least 8 characters long!.');
    }
    this.authservice.SignUp(fullname, this.email, this.password).subscribe({
      next: () => {
        this.authservice.loadUserProfile();
      },
      error: (error) => {
        this.showErrorMessage(error.error);
      },
    });
  }
}
