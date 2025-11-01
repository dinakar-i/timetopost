import { Component } from '@angular/core';

@Component({
  selector: 'app-terms-privacy',
  templateUrl: './terms-privacy.component.html',
  styleUrl: './terms-privacy.component.scss',
})
export class TermsPrivacyComponent {
  goBack(): void {
    window.history.back();
  }
}
