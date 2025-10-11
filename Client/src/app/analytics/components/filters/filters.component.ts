import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-filters',
  standalone: true,
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  imports: [CommonModule, MatIcon],
})
export class FiltersComponent {
  Dates = ['Last 30 Days', 'Last 90 Days', 'Last 365 Days'];
  selectedDate = this.Dates[0];
  isOpen = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectDate(date: string) {
    this.selectedDate = date;
    this.isOpen = false;
  }
}
