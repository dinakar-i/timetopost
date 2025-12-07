import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deleteuser-popup',
  templateUrl: './deleteuser-popup.component.html',
  styleUrl: './deleteuser-popup.component.scss',
})
export class DeleteuserPopupComponent {
  data = inject(MAT_DIALOG_DATA);
  cancel() {}
  confirmDelete() {}
}
