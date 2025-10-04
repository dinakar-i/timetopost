import { Component, Input } from '@angular/core';
import { ChartType } from 'angular-google-charts';
import { GoogleChartsModule } from 'angular-google-charts';
@Component({
  selector: 'app-graph-card',
  templateUrl: './graph-card.component.html',
  styleUrls: ['./graph-card.component.scss'],
  standalone: true,
  imports: [GoogleChartsModule],
})
export class GraphCardComponent {
  @Input() title!: string;
  @Input() type!: ChartType;
  @Input() data!: any[];
  @Input() columns?: string[];
  @Input() options: any = {};
}
