import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Shared/navbar/navbar.component';
import { SidebarComponent } from './Shared/sidebar/sidebar.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, NavbarComponent],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
