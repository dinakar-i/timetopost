import { Component, inject, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from '../../../model/Organization/Organization';
import { MatDialog } from '@angular/material/dialog';
import { AdduserPopupComponent } from '../popups/adduser-popup/adduser-popup.component';
import { DeleteuserPopupComponent } from '../popups/deleteuser-popup/deleteuser-popup.component';
import { Orgservice } from '../../../services/organization/orgservice';
import { Authservice } from '../../../services/authservice';
import { Organization } from '../../../model/Organization/Organization';
@Component({
  selector: 'app-user-row',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss'],
})
export class UserRowComponent {
  @Input() member!: Member;
  @Input() isOwner: boolean = false;
  @Input() isMe: boolean = false;
  @Input() organization!: Organization;
  dialog = inject(MatDialog);
  orgservice = inject(Orgservice);
  authservice = inject(Authservice);
  openEditUserDialog() {
    const dialogRef = this.dialog.open(AdduserPopupComponent, {
      width: '480px',
      maxWidth: '95vw',
      autoFocus: true,
      disableClose: false,
      data: {
        userFullName: this.member.fullName,
        userId: this.member.userId,
        userRole: this.member.role,
        organizationId: this.organization.id,
        isForEditUser: true,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.orgservice
          .editUserToOrganization(result.userId, result.userRole, result.organizationId)
          .subscribe({
            next: () => {
              this.member.role = result.userRole;
            },
            error: (error) => {
              console.error('Error editing user in organization:', error);
            },
          });
      }
    });
  }
  openDeleteUserDialog() {
    const dialogRef = this.dialog.open(DeleteuserPopupComponent, {
      width: '480px',
      maxWidth: '95vw',
      data: {
        userFullName: this.member.fullName,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.orgservice
          .deleteUserToOrganization(this.member.userId, this.organization.id)
          .subscribe({
            next: () => {
              this.organization.members = this.organization.members.filter(
                (m) => m.userId !== this.member.userId
              );
              console.log('User deleted successfully');
            },
            error: (error) => {
              console.error('Error deleting user from organization:', error);
            },
          });
      }
    });
  }
}
