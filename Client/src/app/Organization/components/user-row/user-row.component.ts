import { Component, Input } from '@angular/core';
import { User } from '../../../model/User/User';
import { CommonModule } from '@angular/common';
import { Member } from '../../../model/Organization/Organization';

@Component({
  selector: 'app-user-row',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss'],
})
export class UserRowComponent {
  @Input() member!: Member;
}
