import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-features-section',
  imports: [MatIcon, CommonModule],
  templateUrl: './features-section.component.html',
  styleUrl: './features-section.component.scss',
})
export class FeaturesSectionComponent {
  features = [
    {
      icon: 'schedule',
      title: 'Smart Scheduling',
      desc: 'Plan posts across all platforms effortlessly.',
    },
    {
      icon: 'bar_chart',
      title: 'Analytics Dashboard',
      desc: 'Monitor engagement & audience growth.',
    },
    { icon: 'bolt', title: 'AI Caption Generator', desc: 'Create captions & hashtags instantly.' },
    { icon: 'groups', title: 'Team Collaboration', desc: 'Manage campaigns with your teammates.' },
  ];
}
