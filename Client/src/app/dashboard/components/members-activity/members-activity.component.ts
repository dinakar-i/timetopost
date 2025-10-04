import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCard } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
interface Member {
  name: string;
  role: string;
  posts: number;
  lastActive: string;
}

@Component({
  selector: 'app-members-activity',
  standalone: true,
  imports: [MatTableModule, MatCard, MatCardContent],
  templateUrl: './members-activity.component.html',
  styleUrls: ['./members-activity.component.scss'],
})
export class MembersActivityComponent {
  displayedColumns = ['name', 'role', 'posts', 'lastActive'];
  dataSource: Member[] = [
    { name: 'Dinakar M.', role: 'Admin', posts: 42, lastActive: '2h ago' },
    { name: 'Riya P.', role: 'Editor', posts: 18, lastActive: '1d ago' },
    { name: 'Sam K.', role: 'Contributor', posts: 7, lastActive: '3d ago' },
  ];
}
