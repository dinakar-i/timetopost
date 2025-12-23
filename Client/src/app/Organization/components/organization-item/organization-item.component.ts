import { Component, inject, Input, OnInit } from '@angular/core';
import { UserRowComponent } from '../user-row/user-row.component';
import { CommonModule } from '@angular/common';
import { Member, Organization } from '../../../model/Organization/Organization';
import { Authservice } from '../../../services/authservice';
import { MatDialog } from '@angular/material/dialog';
import { AdduserPopupComponent } from '../popups/adduser-popup/adduser-popup.component';
import { Orgservice } from '../../../services/organization/orgservice';
@Component({
  selector: 'app-organization-item',
  standalone: true,
  imports: [UserRowComponent, CommonModule],
  templateUrl: './organization-item.component.html',
  styleUrls: ['./organization-item.component.scss'],
})
export class OrganizationItemComponent implements OnInit {
  @Input() org!: Organization;
  isOwner: boolean = false;
  expanded = true;
  authservice = inject(Authservice);
  dialog = inject(MatDialog);
  orgservice = inject(Orgservice);
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

  openAddUserDialog() {
    const dialogRef = this.dialog.open(AdduserPopupComponent, {
      width: '480px',
      maxWidth: '95vw',
      autoFocus: true,
      disableClose: false,
      data: { organizationId: this.org.id, isForEditUser: false },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Add User Dialog result:', result);
        this.orgservice
          .addUserToOrganization(result.userEmail, result.userRole, this.org.id)
          .subscribe({
            next: (newMember) => {
              this.org.members.push(newMember);
            },
            error: (error) => {
              console.error('Error adding user to organization:', error);
            },
          });
      }
    });
  }
}
