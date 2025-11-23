import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  imports: [MatButton],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.scss'],
})
export class HeroSectionComponent {
  constructor(private router: Router) {}
  navigateDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
