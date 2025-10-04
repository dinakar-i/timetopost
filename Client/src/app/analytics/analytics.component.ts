import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { GraphCardComponent } from './components/graph-card/graph-card.component';
import { FiltersComponent } from './components/filters/filters.component';
import { CommonModule } from '@angular/common';
import { GoogleChartsModule } from 'angular-google-charts';
import { ChartType } from 'angular-google-charts';
@Component({
  selector: 'app-analytics',
  standalone: true, // ✅ mark as standalone
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    StatCardComponent,
    GraphCardComponent,
    FiltersComponent,
    GoogleChartsModule,
  ],
})
export class AnalyticsComponent {
  stats = [
    { label: 'Followers', value: '48,920', change: '+2.4%', positive: true },
    { label: 'Engagement Rate', value: '4.8%', change: '+0.6%', positive: true },
    { label: 'Reach (30d)', value: '1.2M', change: '+12%', positive: true },
    { label: 'CTR', value: '2.1%', change: '-0.2%', positive: false },
  ];
  followerGrowth = {
    type: ChartType.LineChart,
    columns: ['Date', 'Followers'],
    data: [
      ['Aug 1', 47000],
      ['Aug 5', 47500],
      ['Aug 9', 47800],
      ['Aug 13', 48200],
      ['Aug 17', 48600],
      ['Aug 19', 48920],
    ],
    options: {
      curveType: 'function',
      legend: { position: 'bottom' },
      colors: ['#4CAF50'],
    },
  };

  engagementSplit = {
    type: ChartType.PieChart,
    columns: ['Type', 'Count'],
    data: [
      ['Comments', 15],
      ['Likes', 60],
      ['Saves', 10],
      ['Shares', 15],
    ],
    options: { pieHole: 0.4, colors: ['#42A5F5', '#66BB6A', '#FFCA28', '#EF5350'] },
  };

  postType = {
    type: ChartType.ColumnChart,
    columns: ['Post Type', 'Engagement'],
    data: [
      ['Image', 6000],
      ['Video', 4000],
      ['Reel', 7000],
    ],
    options: { colors: ['#66BB6A', '#42A5F5', '#AB47BC'] },
  };
}
