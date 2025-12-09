import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-adduser-popup',
  imports: [CommonModule, FormsModule],
  templateUrl: './adduser-popup.component.html',
  styleUrls: ['./adduser-popup.component.scss'],
})
export class AdduserPopupComponent {
  userEmail: string = '';
  userRole: string = 'Viewer';
  isForEditUser: boolean = false;
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<AdduserPopupComponent>);
  constructor() {
    this.isForEditUser = this.data?.isForEditUser || false;
    if (this.isForEditUser) {
      this.userEmail = this.data?.userFullName || '';
      this.userRole = this.data?.userRole || 'Viewer';
    }
  }
  addUser() {
    this.dialogRef.close({
      userEmail: this.userEmail,
      userRole: this.userRole,
    });
  }
  editUser() {
    // Logic to edit user role in organization
    this.dialogRef.close({
      userId: this.data?.userId,
      userRole: this.userRole,
      organizationId: this.data?.organizationId,
    });
  }
}
