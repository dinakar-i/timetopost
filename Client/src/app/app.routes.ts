import { Routes } from '@angular/router';
import { Home } from './layout/home/home';
import { Dashboard } from './layout/dashboard/dashboard';
import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' }, // Redirect root
  { path: 'app', component: AppComponent },
  { path: 'home', component: Home },
  { path: 'dashboard', component: Dashboard },
];
