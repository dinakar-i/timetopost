import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PLATFORMS, POST_TYPES, PostDraft, Platform } from '../../model/Utility';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule,
  ],
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent {
  @Input() post!: PostDraft;
  @Input() platforms: Platform[] = PLATFORMS;
  @Input() disableDelete = false;

  @Output() changed = new EventEmitter<PostDraft>();
  @Output() delete = new EventEmitter<string>();
  @Output() focus = new EventEmitter<string>(); // when user interacts (for preview)
  postTypes = POST_TYPES;
  onPlatformChange() {
    const allowed = POST_TYPES[this.post.platform];
    if (!allowed.includes(this.post.type)) this.post.type = allowed[0];
    this.emit();
  }

  onFileSelect(ev: Event) {
    const input = ev.target as HTMLInputElement;
    if (!input.files) return;
    const files = Array.from(input.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        // for non-carousel, keep only first
        if (this.post.type !== 'Carousel') this.post.images = [reader.result as string];
        else this.post.images.push(reader.result as string);
        this.emit();
      };
      reader.readAsDataURL(file);
    });
    input.value = '';
  }

  removeImage(i: number) {
    this.post.images.splice(i, 1);
    this.emit();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousIndex === event.currentIndex) return;

    // Move the actual data inside the array
    moveItemInArray(this.post.images, event.previousIndex, event.currentIndex);

    console.log('Images reordered:', this.post.images);

    this.emit(); // Send updated post to parent
  }

  emit() {
    this.changed.emit({ ...this.post });
  }
}
