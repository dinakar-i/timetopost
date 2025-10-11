import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { JobComponent } from './job/job.component';
import { PhonePreviewComponent } from '../Shared/phone-preview/phone-preview.component';
@Component({
  selector: 'app-scheduled-jobs',
  standalone: true,
  imports: [CommonModule, JobComponent, MatSelectModule, FormsModule, PhonePreviewComponent],
  templateUrl: './scheduledjobs.component.html',
  styleUrls: ['./scheduledjobs.component.scss'],
})
export class ScheduledjobsComponent {
  jobs = [
    {
      id: 'J-201',
      title: 'Ocean Teaser Campaign',
      platform: 'Instagram',
      type: 'Reel',
      creator: 'Dinakar M.',
      caption: 'Experience the calm before the storm 🌊 #OceanTeaser',
      time: '2025-08-22 10:00 AM',
      status: 'Scheduled',
      image: 'https://picsum.photos/seed/201/400/600',
    },
    {
      id: 'J-202',
      title: 'Feature Highlight',
      platform: 'Facebook',
      type: 'Video',
      creator: 'Riya P.',
      caption: 'Unveiling our latest update — smoother, faster, better 🚀',
      time: '2025-08-23 09:00 AM',
      status: 'Published',
      image: 'https://picsum.photos/seed/202/400/600',
    },
    {
      id: 'J-203',
      title: 'Behind the Scenes',
      platform: 'Instagram',
      type: 'Post',
      creator: 'Sam K.',
      caption: 'A sneak peek into how our team brings ideas to life 🎬',
      time: '2025-08-24 05:00 PM',
      status: 'Published',
      image: 'https://picsum.photos/seed/203/400/600',
    },
    {
      id: 'J-204',
      title: 'New Trailer Release',
      platform: 'Twitter',
      type: 'Post',
      creator: 'Dinakar M.',
      caption: 'The wait is over! Watch our brand new trailer now 🎥🔥',
      time: '2025-08-25 07:30 PM',
      status: 'Scheduled',
      image: 'https://picsum.photos/seed/204/400/600',
    },
    {
      id: 'J-205',
      title: 'Draft Story Example',
      platform: 'Instagram',
      type: 'Post',
      creator: 'Riya P.',
      caption: 'What’s coming next? 👀 Stay tuned for a big reveal!',
      time: '2025-08-26 02:00 PM',
      status: 'Draft',
      image: 'https://picsum.photos/seed/206/400/600',
    },
    {
      id: 'J-206',
      title: 'Morning Motivation',
      platform: 'Facebook',
      type: 'Post',
      creator: 'Leo D.',
      caption: 'Start your day with purpose ☀️ #MotivationMonday',
      time: '2025-09-01 08:15 AM',
      status: 'Scheduled',
      image: 'https://picsum.photos/seed/206/400/600',
    },
    {
      id: 'J-207',
      title: 'Product Carousel',
      platform: 'Instagram',
      type: 'Carousel',
      creator: 'Nina L.',
      caption: 'Swipe ➡️ to explore our latest collection 💫',
      time: '2025-09-03 06:30 PM',
      status: 'Published',
      image: 'https://picsum.photos/seed/207/400/600',
    },
    {
      id: 'J-208',
      title: 'Team Highlights',
      platform: 'Facebook',
      type: 'Post',
      creator: 'Sam K.',
      caption: 'Celebrating the faces behind our success 🙌',
      time: '2025-09-04 07:00 AM',
      status: 'Published',
      image: 'https://picsum.photos/seed/208/400/600',
    },
    {
      id: 'J-209',
      title: 'Sneak Peek Reel',
      platform: 'Instagram',
      type: 'Reel',
      creator: 'Ava R.',
      caption: 'Something exciting is rolling out soon 🎞️',
      time: '2025-09-05 04:30 PM',
      status: 'Scheduled',
      image: 'https://picsum.photos/seed/209/400/600',
    },
    {
      id: 'J-210',
      title: 'Community Love',
      platform: 'Twitter',
      type: 'Post',
      creator: 'Riya P.',
      caption: 'Your feedback means everything ❤️ #CommunityFirst',
      time: '2025-09-07 11:00 AM',
      status: 'Published',
      image: 'https://picsum.photos/seed/210/400/600',
    },
    {
      id: 'J-211',
      title: 'Weekend Chill Vibes',
      platform: 'Instagram',
      type: 'Story',
      creator: 'Dinakar M.',
      caption: 'Take a breath, enjoy the weekend 🌴☕',
      time: '2025-09-08 07:30 PM',
      status: 'Draft',
      image: 'https://picsum.photos/seed/211/400/600',
    },
    {
      id: 'J-212',
      title: 'Launch Countdown',
      platform: 'Facebook',
      type: 'Story',
      creator: 'Nina L.',
      caption: '⏳ Only 2 days until launch — are you ready?',
      time: '2025-09-09 09:00 AM',
      status: 'Scheduled',
      image: 'https://picsum.photos/seed/212/400/600',
    },
    {
      id: 'J-213',
      title: 'Feature Demo Video',
      platform: 'Twitter',
      type: 'Video',
      creator: 'Leo D.',
      caption: 'Watch our latest demo in action ⚙️ #TechUpdate',
      time: '2025-09-10 05:00 PM',
      status: 'Published',
      image: 'https://picsum.photos/seed/213/400/600',
    },
    {
      id: 'J-214',
      title: 'Culture Moments',
      platform: 'Facebook',
      type: 'Carousel',
      creator: 'Ava R.',
      caption: 'Teamwork, passion, and smiles all around 💙',
      time: '2025-09-12 03:45 PM',
      status: 'Scheduled',
      image: 'https://picsum.photos/seed/214/400/600',
    },
    {
      id: 'J-215',
      title: 'Throwback Thursday',
      platform: 'Instagram',
      type: 'Post',
      creator: 'Sam K.',
      caption: 'A throwback to one of our proudest launches 🎉',
      time: '2025-09-13 12:00 PM',
      status: 'Draft',
      image: 'https://picsum.photos/seed/215/400/600',
    },
  ];

  selectedPlatform = 'All';
  selectedStatus = 'All';
  selectedJob: any = null;
  platforms = ['All', 'Reel', 'Video', 'Post', 'Carousel', 'Story'];
  statuses = ['All', 'Scheduled', 'Published', 'Draft'];

  get filteredJobs() {
    return this.jobs.filter(
      (job) =>
        (this.selectedPlatform === 'All' || job.platform === this.selectedPlatform) &&
        (this.selectedStatus === 'All' || job.status === this.selectedStatus)
    );
  }

  selectJob(job: any) {
    this.selectedJob = job;
  }
}
