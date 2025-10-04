import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  NgZone,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
// Add MatIconModule to your imports array in the @Component decorator
@Component({
  selector: 'app-stats-cards',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule],
  templateUrl: './stats-cards.component.html',
  styleUrls: ['./stats-cards.component.scss'],
})
export class StatsCardsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('avatarsContainer') avatarsContainer!: ElementRef<HTMLDivElement>;

  members = Array.from({ length: 7 }, (_, i) => {
    const names = ['Ivan', 'Judy', 'Kevin', 'Laura', 'Mallory', 'Niaj', 'Olivia'];
    const name = names[i % names.length];
    return {
      name,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
    };
  });
  maxAvatars = 10; // default

  private resizeListener = () => this.calculateMaxAvatars();

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.calculateMaxAvatars();
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('resize', this.resizeListener);
    });
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener);
  }

  calculateMaxAvatars() {
    setTimeout(() => {
      if (!this.avatarsContainer) return;
      const avatarWidth = 32; // px
      const overlap = 16; // px (50% overlap)
      const containerWidth = this.avatarsContainer.nativeElement.offsetWidth;
      let max = Math.max(
        1,
        Math.floor((containerWidth - avatarWidth) / (avatarWidth - overlap)) + 1
      );
      max = Math.max(1, max - 2);
      this.maxAvatars = max;
      this.cdr.detectChanges();
    });
  }
}
