export type PageFocus = null | string;

export const enum Page {
    Home,
    Works,
    About
}

export const pageToPath = {
    [Page.Home]: 'home',
    [Page.Works]: 'works',
    [Page.About]: 'about'
}