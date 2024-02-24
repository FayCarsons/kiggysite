import { Ref, createSignal, onCleanup } from 'solid-js';
import { Page, pageToPath } from '../lib'

export const enum ImageSize {
  Gallery = '_medium',
  Focus = '',
}

// Get PNG icons
export const getIconPath = (title: string): string => {
  return `./icons/${title}.avif`;
};

// Get large WEBP images for gallery and single image view
export const getImagePath = (title: string, size: ImageSize, page: Page): string => {
  return `./images/${pageToPath[page]}/${title}${size}.avif`;
};

const createObserver = (callback: (_: any) => any, options = {}) => {
  const defaultOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px',
  };
  return new IntersectionObserver(callback, { ...defaultOptions, ...options });
};

// Lazy loaded image that loads on intersection w/ viewport, and then fades
// opacity in once image is loaded
interface LazyImageProps {
  id?: string;
  title: string;
  className?: string;
  click?: () => void;
  onload?: any;
  parentClass: string;
}
export const LazyImage = (props: LazyImageProps) => {
  const [isVisibile, setVisible] = createSignal<boolean>(false);

  const observer = createObserver((entries) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(entry.target);
      }
    });
  });

  const baseClass = `${props.className} transition-opacity duration-300 ease-in`;
  const initClass = `${baseClass} opacity-0`;
  const loadClass = `${baseClass} opacity-100`;

  let containerRef = (parent: Ref<HTMLDivElement>) => {
    if (parent) observer.observe(parent as HTMLDivElement);
  };

  const imageRef = (el: HTMLImageElement) => {
    if (el) {
      el.onload = () => {
        el.className = '';
        el.className = loadClass;
      };
    }
  };

  onCleanup(() => {
    observer.disconnect();
  });
  return (
    <div class={props.parentClass} ref={containerRef}>
      <img
        alt={`Drawing titled: ${props.id}`}
        src={isVisibile() ? props.title : undefined}
        id={props.id}
        class={initClass}
        onclick={props.click}
        ref={imageRef}
      />
    </div>
  );
};
