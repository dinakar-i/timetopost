import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { ScheduledjobsComponent } from './scheduledjobs/scheduledjobs.component';
import { CreatePostsComponent } from './CreatePost/create-posts.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TermsPrivacyComponent } from './legal/terms-privacy/terms-privacy.component';
import { SignupComponent } from './signup/signup.component';
import { authguardGuard } from './guards/authguard/authguard-guard';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { SigninComponent } from './signin/signin.component';
import { OrganizationComponent } from './Organization/organization.component';
export const routes: Routes = [
  { path: '', component: LandingPageComponent }, // Redirect root
  { path: 'legal', component: TermsPrivacyComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authguardGuard] },
  { path: 'analytics', component: AnalyticsComponent, canActivate: [authguardGuard] },
  { path: 'jobs', component: ScheduledjobsComponent, canActivate: [authguardGuard] },
  { path: 'post', component: CreatePostsComponent, canActivate: [authguardGuard] },
  { path: 'app', component: AuthPageComponent, canDeactivate: [authguardGuard] },
  { path: 'signin', component: SigninComponent, canDeactivate: [authguardGuard] },
  { path: 'signup', component: SignupComponent, canDeactivate: [authguardGuard] },
  { path: 'organizations', component: OrganizationComponent, canActivate: [authguardGuard] },
];
