import { Component, inject, Inject, OnInit } from '@angular/core';
import { OrganizationItemComponent } from '../organization-item/organization-item.component';
import { CommonModule } from '@angular/common';
import { Organization } from '../../../model/Organization/Organization';
import { Orgservice } from '../../../services/organization/orgservice';
@Component({
  selector: 'app-organization-list',
  standalone: true,
  imports: [OrganizationItemComponent, CommonModule],
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.scss'],
})
export class OrganizationListComponent implements OnInit {
  organizations: Organization[] | null = null;
  orgservice = inject(Orgservice);

  async ngOnInit(): Promise<void> {
    await this.orgservice.loadOrganizations();
    this.organizations = this.orgservice.organizations;
    console.log(this.organizations);
  }
}
