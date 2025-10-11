import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-phone-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './phone-preview.component.html',
  styleUrls: ['./phone-preview.component.scss'],
})
export class PhonePreviewComponent {
  @Input() job: any = null;
  @Input() tempjob: any = null;
  showFullCaption = false;
  captionlength = 26;
  constructor(private sanitizer: DomSanitizer) {}

  defaultProfile = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
  defaultImage = 'https://picsum.photos/seed/default/400/400';

  get isInstagram() {
    return this.job?.platform?.toLowerCase() === 'instagram';
  }

  get isFacebook() {
    return this.job?.platform?.toLowerCase() === 'facebook';
  }

  get isTwitter() {
    return this.job?.platform?.toLowerCase() === 'twitter';
  }

  get formattedCaption(): SafeHtml {
    if (!this.job?.caption) return '';

    const rawText = this.job.caption;
    const needsToggle = rawText.length > this.captionlength;

    let displayText = '';

    // Show either the full or short plain text
    if (this.showFullCaption || !needsToggle) {
      displayText = rawText;
    } else {
      displayText = rawText.substring(0, this.captionlength);
    }

    // Convert hashtags in the visible text only
    const styledText = displayText.replace(
      /#(\w+)/g,
      `<span class="hashtag" style="color:#125688; font-weight:500; cursor:pointer;">#$1</span>`
    );

    // Build final HTML
    let html = `<strong>${this.job.creator}</strong> ${styledText}`;
    if (needsToggle) {
      html += this.showFullCaption
        ? ` <span class="toggle-text" style="color:#888; cursor:pointer;">less</span>`
        : `... <span class="toggle-text" style="color:#888; cursor:pointer;">more</span>`;
    }

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  /** ✅ Detect click on “more / less” inside the <p> tag */
  toggleCaption(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('toggle-text')) {
      this.showFullCaption = !this.showFullCaption;
    }
  }
}
