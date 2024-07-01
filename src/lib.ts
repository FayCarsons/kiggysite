import { home } from './home.ts'
import { works } from './works.ts'
import { about } from './about.ts'
import type { SizeMap } from './image-types.ts';

export type PageFocus = number

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

export function bound(n: number, bound: number) {
  return ((n % bound) + bound) % bound
}

export function titleToURI_AVIF(title: string, page: Page) {
  return `images/${page}/${title}.avif`
}
