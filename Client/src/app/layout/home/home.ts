import { Component } from '@angular/core';
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  googleLogin() {
    window.location.href = 'https://localhost:5129/signin';
  }
}
