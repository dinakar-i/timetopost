import { Component } from '@angular/core';

@Component({
  selector: 'app-footer-section',
  imports: [],
  templateUrl: './footer-section.component.html',
  styleUrl: './footer-section.component.scss',
})
export class FooterSectionComponent {
  // expose the current year for the template
  currentYear: number = new Date().getFullYear();
}
