import { Component, inject, OnInit } from '@angular/core';
import { Authservice } from '../services/authservice';

@Component({
  selector: 'app-auth-page',
  imports: [],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent implements OnInit {
  authService = inject(Authservice);

  ngOnInit() {
    this.authService.loadUserProfile();
  }
}
