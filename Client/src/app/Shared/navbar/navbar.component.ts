import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatSelectModule, MatFormFieldModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  organizations = [
    { name: 'Grazation 1', logo: 'https://ui-avatars.com/api/?name=G1&background=random' },
    { name: 'Grazation 2', logo: 'https://ui-avatars.com/api/?name=G2&background=random' },
    { name: 'Grazation 3', logo: 'https://ui-avatars.com/api/?name=G3&background=random' },
    { name: 'Grazation 4', logo: 'https://ui-avatars.com/api/?name=G4&background=random' },
    { name: 'Grazation 5', logo: 'https://ui-avatars.com/api/?name=G5&background=random' },
    { name: 'Grazation 6', logo: 'https://ui-avatars.com/api/?name=G6&background=random' },
    { name: 'Grazation 7', logo: 'https://ui-avatars.com/api/?name=G7&background=random' },
    { name: 'Grazation 8', logo: 'https://ui-avatars.com/api/?name=G8&background=random' },
    { name: 'Grazation 9', logo: 'https://ui-avatars.com/api/?name=G9&background=random' },
    { name: 'Grazation 10', logo: 'https://ui-avatars.com/api/?name=G10&background=random' },
  ];
  selectedOrg = this.organizations[0];
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOrg(org: any) {
    this.selectedOrg = org;
    this.isOpen = false;
  }
}
