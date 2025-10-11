import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ScheduledjobsComponent } from './scheduledjobs/scheduledjobs.component';
import { CreatePostsComponent } from './CreatePost/create-posts.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Redirect root
  { path: 'dashboard', component: DashboardComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'jobs', component: ScheduledjobsComponent },
  { path: 'post', component: CreatePostsComponent },
];
