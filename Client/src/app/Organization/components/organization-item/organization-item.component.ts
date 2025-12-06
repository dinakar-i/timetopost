import { Component, Input } from '@angular/core';
import { UserRowComponent } from '../user-row/user-row.component';
import { CommonModule } from '@angular/common';
import { Organization } from '../../../model/Organization/Organization';
@Component({
  selector: 'app-organization-item',
  standalone: true,
  imports: [UserRowComponent, CommonModule],
  templateUrl: './organization-item.component.html',
  styleUrls: ['./organization-item.component.scss'],
})
export class OrganizationItemComponent {
  @Input() org!: Organization;

  expanded = true;
}
