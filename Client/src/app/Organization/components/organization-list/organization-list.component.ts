import { Component } from '@angular/core';
import { OrganizationItemComponent } from '../organization-item/organization-item.component';
import { CommonModule } from '@angular/common';
import { Member, Organization, Platform } from '../../../model/Organization/Organization';
@Component({
  selector: 'app-organization-list',
  standalone: true,
  imports: [OrganizationItemComponent, CommonModule],
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss'],
})
export class OrganizationListComponent {
  organizations = [
    new Organization(
      1,
      'Acme Corp',
      [
        new Member(1, 'Alice Johnson', 'Owner'),
        new Member(2, 'Bob Smith', 'Editor'),
        new Member(3, 'Carol Davis', 'Viewer'),
      ],
      [new Platform(1, 'Facebook', 'token_fb_1', '2025-12-31T23:59:59')]
    ),
    new Organization(
      1,
      'Acme Corp',
      [
        new Member(1, 'Alice Johnson', 'Owner'),
        new Member(2, 'Bob Smith', 'Editor'),
        new Member(3, 'Carol Davis', 'Viewer'),
      ],
      [new Platform(1, 'Facebook', 'token_fb_1', '2025-12-31T23:59:59')]
    ),
  ];
}
