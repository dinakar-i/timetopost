import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-platform-breakdown',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './platform-breakdown.component.html',
  styleUrls: ['./platform-breakdown.component.scss'],
})
export class PlatformBreakdownComponent {}
