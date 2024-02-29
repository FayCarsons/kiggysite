import { home } from './home.ts'
import { works } from './works.ts'
import { about } from './about.ts'
import type { SizeMap } from './image-types.ts';

export type PageFocus = null | string;

export const enum Page {
  Home = 'home',
  Works = 'works',
  About = 'about'
}

export const imageSizeMap: Record<Page, SizeMap> = {
  [Page.Home]: home,
  [Page.Works]: works,
  [Page.About]: about
}
