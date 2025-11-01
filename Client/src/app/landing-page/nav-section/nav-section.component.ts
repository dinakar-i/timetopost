import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-section',
  templateUrl: './nav-section.component.html',
  styleUrls: ['./nav-section.component.scss'],
  standalone: true, // <- ensure standalone component
  imports: [CommonModule, RouterModule],
})
export class NavSectionComponent {}
