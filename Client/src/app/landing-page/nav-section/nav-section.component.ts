import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../model/environment';
import { Authservice } from '../../services/authservice';
@Component({
  selector: 'app-nav-section',
  templateUrl: './nav-section.component.html',
  styleUrls: ['./nav-section.component.scss'],
  standalone: true, // <- ensure standalone component
  imports: [CommonModule, RouterModule],
})
export class NavSectionComponent {
  public baseUrl = environment.apiUrl;
  public authserice = inject(Authservice);
}
