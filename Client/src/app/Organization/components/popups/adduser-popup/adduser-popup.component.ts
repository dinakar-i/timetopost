import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  constructor() {
    this.isForEditUser = this.data?.isForEditUser || false;
    if (this.isForEditUser) {
      this.userEmail = this.data?.userFullName || '';
      this.userRole = this.data?.userRole || 'Viewer';
    }
  }
  addUser() {
    // Logic to add user to organization
    console.log(`Adding user with email: ${this.userEmail} and role: ${this.userRole}`);
  }
  editUser() {
    // Logic to edit user role in organization
    console.log(`Editing user with email: ${this.userEmail} to role: ${this.userRole}`);
  }
}
