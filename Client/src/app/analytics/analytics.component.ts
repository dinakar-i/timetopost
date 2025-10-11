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
    { label: 'Reach', value: '1.2M', change: '+12%', positive: true },
    { label: 'CTR', value: '2.1%', change: '-0.2%', positive: false },
  ];
  bestTimesData: { [day: string]: { [time: string]: number } } = {
    Sun: { '8a': 20, '10a': 40, '12p': 80, '2p': 60, '4p': 30, '6p': 50, '8p': 10 },
    Mon: { '8a': 10, '10a': 20, '12p': 50, '2p': 70, '4p': 40, '6p': 60, '8p': 30 },
    Tue: { '8a': 30, '10a': 50, '12p': 60, '2p': 90, '4p': 20, '6p': 40, '8p': 10 },
    Wed: { '8a': 15, '10a': 25, '12p': 70, '2p': 85, '4p': 55, '6p': 40, '8p': 25 },
    Thu: { '8a': 25, '10a': 35, '12p': 65, '2p': 75, '4p': 45, '6p': 55, '8p': 15 },
    Fri: { '8a': 5, '10a': 15, '12p': 35, '2p': 55, '4p': 65, '6p': 75, '8p': 20 },
  };

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

  getColor(value: number): string {
    if (value === 0) return '#f5f5f5'; // light grey for no engagement
    const green = Math.floor((value / 100) * 200); // scale 0–100 to 0–200
    return `rgb(0, ${green}, 0)`; // darker green as % increases
  }
}
