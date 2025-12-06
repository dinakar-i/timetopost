import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Member } from '../../../model/Organization/Organization';
import { MatDialog } from '@angular/material/dialog';
import { AdduserPopupComponent } from '../popups/adduser-popup/adduser-popup.component';

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
  dialog = inject(MatDialog);

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
        isForEditUser: true,
      },
    });
  }
}
