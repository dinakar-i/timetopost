import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PostCardComponent } from './post-card/post-card.component';
import { PhonePreviewComponent } from '../Shared/phone-preview/phone-preview.component';
import { PLATFORMS, POST_TYPES, PostDraft, Platform, createNewDraft } from '../model/Utility';
// Optional preview (use your existing component)
// import { PhonePreviewComponent } from '../phone-preview/phone-preview.component';

let counter = 1;

@Component({
  selector: 'app-create-posts',
  standalone: true,
  imports: [CommonModule, MatButtonModule, PostCardComponent, MatIcon, PhonePreviewComponent],
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.scss'],
})
export class CreatePostsComponent {
  platforms: Platform[] = PLATFORMS;
  posts: PostDraft[] = [createNewDraft()];
  activeId = this.posts[0].id;

  addPost() {
    const p = createNewDraft();
    this.posts.push(p);
    this.activeId = p.id;
  }

  updatePost(updated: PostDraft) {
    this.posts = this.posts.map((p) => (p.id === updated.id ? updated : p));
  }

  removePost(id: string) {
    if (this.posts.length === 1) return;
    this.posts = this.posts.filter((p) => p.id !== id);
    if (!this.posts.find((p) => p.id === this.activeId)) this.activeId = this.posts[0]?.id;
  }

  setActive(id: string) {
    this.activeId = id;
  }
  get activePost(): PostDraft | null {
    return this.posts.find((p) => p.id === this.activeId) ?? this.posts[0];
  }

  scheduleAll() {
    // TODO: emit to service/backend
    console.log('Schedule payload', this.posts);
  }
}
