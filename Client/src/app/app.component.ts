import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { AccountService } from './service/Auth/account-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet],
  providers: [AccountService],
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private accountService = inject(AccountService);

  title = 'Client';

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin(): void {
    this.route.queryParams.subscribe({
      next: (params) => {
        const token = params['token'];
        if (token) {
          try {
            this.accountService.storeToken(token);
            this.router.navigate(['/dashboard']);
          } catch (error) {
            console.error('Failed to store token:', error);
          }
        }
        // Optionally handle the "no token" case here if needed
      },
      error: (err) => {
        console.error('Error reading query params:', err);
      },
    });
  }
}
