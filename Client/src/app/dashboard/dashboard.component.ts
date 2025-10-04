import { Component } from '@angular/core';
import { StatsCardsComponent } from './components/stats-cards/stats-cards.component';
import { PlatformBreakdownComponent } from './components/platform-breakdown/platform-breakdown.component';
import { MembersActivityComponent } from './components/members-activity/members-activity.component';
import { PostCalendarComponent } from './components/post-calendar/post-calendar.component';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    StatsCardsComponent,
    PlatformBreakdownComponent,
    MembersActivityComponent,
    PostCalendarComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {}
