import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../service/Auth/account-service';
import { User } from '../../model/User';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard {
  name = User.getCurrentUser()?.fullName;
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  accountService = inject(AccountService);
}
