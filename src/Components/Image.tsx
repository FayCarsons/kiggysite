import { Ref, createSignal, onCleanup, Show } from 'solid-js';
import { Page, imageSizeMap } from '../lib'
import { Resolution } from '../image-types.ts';

export const enum ImageSize {
  Gallery = '_medium',
  Focus = '',
}

// Get AVIF icons
export const getIconPath = (title: string): string => {
  return `./icons/${title}.avif`;
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
  page: Page;
  className?: string;
  click?: () => void;
  onload?: any;
  parentClass: string;
}
export const LazyImage = (props: LazyImageProps) => {
  const [isVisible, setVisible] = createSignal<boolean>(false);

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

  const containerRef = (parent: Ref<HTMLDivElement>) => {
    if (parent) observer.observe(parent as HTMLDivElement);
  };

  const imageRef = (el: HTMLImageElement) => {
    if (el) {
      el.onload = () => {
        el.className = loadClass;
      };
    }
  };

  onCleanup(() => {
    observer.disconnect();
  });

  const sizes = imageSizeMap[props.page][props.title];

  const wWidth = window.innerWidth;

  let resolution: Resolution;

  const medium = 481;
  const large = 1025;

  if (wWidth < medium) resolution = sizes.small
  else if (wWidth < large) resolution = sizes.medium
  else resolution = sizes.large

  const { width, height } = resolution;

  const paths = {
    large: `./images/${props.page.valueOf()}/${props.title}_large.avif`,
    medium: `./images/${props.page.valueOf()}/${props.title}_medium.avif`,
    small: `./images/${props.page.valueOf()}/${props.title}_small.avif`
  };

  return (
    <div class={props.parentClass} ref={containerRef}>
      <picture>
        <source media={`(min-width: ${large}px)`} srcset={paths['large']} type='image/avif' />
        <source media={`(min-width: ${medium}px)`} srcset={paths['medium']} type='image/avif' />
        <img
          src={paths['small']}
          alt={`A digital art-piece titled ${props.title}`}
          id={props.id}
          class={initClass}
          onclick={props.click}
          ref={imageRef}
          width={width}
          height={height}
        />
      </picture>
    </div>
  );
};
