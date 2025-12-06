import { Component } from '@angular/core';
import { OrganizationListComponent } from './components/organization-list/organization-list.component';

@Component({
  selector: 'app-organization',
  imports: [OrganizationListComponent],
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss',
})
export class OrganizationComponent {}
