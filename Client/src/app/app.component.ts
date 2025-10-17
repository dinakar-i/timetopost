import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { SidebarComponent } from './Shared/sidebar/sidebar.component';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, CommonModule],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLandingPage = false;

  constructor(private router: Router) {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.isLandingPage = this.router.url === '/';
    });
  }
}
