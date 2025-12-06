import { Component, inject, Input, OnInit } from '@angular/core';
import { UserRowComponent } from '../user-row/user-row.component';
import { CommonModule } from '@angular/common';
import { Organization } from '../../../model/Organization/Organization';
import { Authservice } from '../../../services/authservice';
@Component({
  selector: 'app-organization-item',
  standalone: true,
  imports: [UserRowComponent, CommonModule],
  templateUrl: './organization-item.component.html',
  styleUrls: ['./organization-item.component.scss'],
})
export class OrganizationItemComponent implements OnInit {
  @Input() org!: Organization;
  @Input() isOwner: boolean = false;
  expanded = true;
  authservice = inject(Authservice);
  ngOnInit(): void {
    this.isOwner = this.isImOwner();
  }

  isImOwner(): boolean {
    const currentUserId = this.authservice.User?.id;
    for (let member of this.org.members) {
      if (member.userId === currentUserId && member.role.toLowerCase() === 'owner') return true;
    }
    return false;
  }
}
