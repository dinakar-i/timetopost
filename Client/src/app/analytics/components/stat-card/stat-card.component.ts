import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss'],
  imports: [CommonModule],
})
export class StatCardComponent {
  @Input() label!: string;
  @Input() value!: string;
  @Input() change!: string;
  @Input() positive: boolean = true;
}
