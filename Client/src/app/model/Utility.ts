// src/app/shared/utils/post-utils.ts
import { nanoid } from 'nanoid';

export type Platform = 'Instagram' | 'Facebook' | 'Twitter' | 'LinkedIn' | 'YouTube';

export type PostType =
  | 'Post'
  | 'Reel'
  | 'Story'
  | 'Carousel'
  | 'Video'
  | 'Link'
  | 'Tweet'
  | 'Short'
  | 'Image'
  | 'Article';

export interface PostDraft {
  id: string;
  platform: Platform;
  type: PostType;
  caption: string;
  images: string[]; // one or multiple media items
  date: Date | null;
  time: string;
  creator?: string;
  title?: string;
  status?: 'Scheduled' | 'Published' | 'Draft';
}

/** ✅ Available Platforms */
export const PLATFORMS: Platform[] = ['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'YouTube'];

/** ✅ Post Types Allowed per Platform */
export const POST_TYPES: Record<Platform, PostType[]> = {
  Instagram: ['Post', 'Reel', 'Story', 'Carousel', 'Video'],
  Facebook: ['Post', 'Video', 'Link', 'Carousel'],
  Twitter: ['Tweet', 'Post', 'Video'],
  LinkedIn: ['Post', 'Image', 'Article'],
  YouTube: ['Video', 'Short'],
};

/** ✅ Utility for Creating a Fresh Draft */

export function createNewDraft(platform: Platform = 'Instagram'): PostDraft {
  return {
    id: 'D-' + nanoid(),
    platform,
    type: POST_TYPES[platform][0],
    caption: '24/7 🚨.Worst Raa//fire 🔥 #biggBoss #sessoion6',
    images: [],
    date: null,
    time: '',
    creator: 'dinakar_i',
    title: 'New Post',
    status: 'Draft',
  };
}
