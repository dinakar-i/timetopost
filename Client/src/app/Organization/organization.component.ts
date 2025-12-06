import { Component, inject } from '@angular/core';
import { OrganizationListComponent } from './components/organization-list/organization-list.component';
import { Authservice } from '../services/authservice';

@Component({
  selector: 'app-organization',
  imports: [OrganizationListComponent],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss',
})
export class OrganizationComponent {
  authservice = inject(Authservice);
}
