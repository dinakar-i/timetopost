import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ScheduledjobsComponent } from './scheduledjobs/scheduledjobs.component';
import { CreatePostsComponent } from './CreatePost/create-posts.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TermsPrivacyComponent } from './legal/terms-privacy/terms-privacy.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent }, // Redirect root
  { path: 'legal', component: TermsPrivacyComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'jobs', component: ScheduledjobsComponent },
  { path: 'post', component: CreatePostsComponent },
];
