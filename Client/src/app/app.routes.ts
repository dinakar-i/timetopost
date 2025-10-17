import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ScheduledjobsComponent } from './scheduledjobs/scheduledjobs.component';
import { CreatePostsComponent } from './CreatePost/create-posts.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent }, // Redirect root
  { path: 'dashboard', component: DashboardComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'jobs', component: ScheduledjobsComponent },
  { path: 'post', component: CreatePostsComponent },
];
