import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Organization, Platform } from '../../../../model/Organization/Organization';

@Component({
  selector: 'app-manage-organization',
  standalone: true, // Assuming you are using standalone components
  imports: [CommonModule],
  templateUrl: './manage-organization.component.html',
  styleUrl: './manage-organization.component.scss'
})
export class ManageOrganizationComponent {
  dialogRef = inject(DialogRef<ManageOrganizationComponent>);
  data = inject(MAT_DIALOG_DATA);

  // Correctly access the organization from injected data
  organization: Organization = this.data.organization;

  // Platforms available to be added
  availableOptions = [
    { name: 'Instagram', icon: 'fa-facebook-f' },
    { name: 'Facebook', icon: 'fa-instagram' },
    { name: 'X (Twitter)', icon: 'fa-x-twitter' },
    { name: 'TikTok', icon: 'fa-tiktok' },
    { name: 'YouTube', icon: 'fa-youtube' }
  ];

  removePlatform(id: number) {
    this.organization.platforms = this.organization.platforms.filter(p => p.id !== id);
  }

  addPlatform(platformName: string) {
    const newId = Math.floor(Math.random() * 1000);
    const mockToken = 'new-token-' + newId;
    const expiry = '2026-01-01';
    
    const newEntry = new Platform(newId, platformName, mockToken, expiry);
    this.organization.platforms.push(newEntry);
  }

  isExpired(expiryDate: string): boolean {
    return new Date(expiryDate) < new Date();
  }

  close() {
    this.dialogRef.close();
  }
}