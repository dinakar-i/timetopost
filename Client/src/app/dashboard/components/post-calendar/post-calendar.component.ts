import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

interface CalendarPost {
  date: any;
  post: string;
  author: string;
  status: 'completed' | 'scheduled' | 'draft';
}

@Component({
  selector: 'app-post-calendar',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './post-calendar.component.html',
  styleUrls: ['./post-calendar.component.scss'],
})
export class PostCalendarComponent {
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth(); // 0–11
  currentYear = this.currentDate.getFullYear();
  today = this.currentDate.getDate();
  get currentMonthName() {
    return this.currentDate.toLocaleString('default', { month: 'long' });
  }

  get days() {
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  posts: CalendarPost[] = [
    {
      date: new Date(2025, 9, 18),
      post: 'Facebook Feature',
      author: 'Riya P.',
      status: 'completed',
    },
    {
      date: new Date(2025, 9, 18),
      post: 'Instagram Story',
      author: 'Dinakar M.',
      status: 'scheduled',
    },
    {
      date: new Date(2025, 9, 19),
      post: 'Twitter Behind the scenes',
      author: 'Sam K.',
      status: 'draft',
    },
    {
      date: new Date(2025, 10, 20),
      post: 'Instagram New Post',
      author: 'Dinakar M.',
      status: 'completed',
    },
  ];

  // ✅ Move to previous month
  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.currentDate = new Date(this.currentYear, this.currentMonth, 1);
  }

  // ✅ Move to next month
  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.currentDate = new Date(this.currentYear, this.currentMonth, 1);
  }

  // ✅ Get posts for specific day of current month
  getPostsForDay(day: number): CalendarPost[] {
    const date = new Date(this.currentYear, this.currentMonth, day);
    return this.posts.filter((p) => this.isSameDay(p.date, date));
  }

  private isSameDay(d1: Date, d2: Date): boolean {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  }

  // ✅ Add a new post
  addPost(day: number) {
    const date = new Date(this.currentYear, this.currentMonth, day);
    this.posts.push({
      date: date,
      post: `New Scheduled Post on ${day} ${this.currentMonthName}`,
      author: 'You',
      status: 'scheduled',
    });
  }

  isFutureOrToday(day: number): boolean {
    const date = new Date(this.currentYear, this.currentMonth, day);
    const now = new Date();

    // Only allow if the date is today or later
    return date >= new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }
}
