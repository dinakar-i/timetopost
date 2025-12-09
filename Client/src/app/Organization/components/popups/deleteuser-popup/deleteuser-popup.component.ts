import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-deleteuser-popup',
  templateUrl: './deleteuser-popup.component.html',
  styleUrl: './deleteuser-popup.component.scss',
})
export class DeleteuserPopupComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<DeleteuserPopupComponent>);
  cancel() {
    this.dialogRef.close(false);
  }
  confirmDelete() {
    this.dialogRef.close(true);
  }
}
