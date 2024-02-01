import { Ref, createEffect, createSignal, onCleanup, onMount } from 'solid-js';
import { JSX } from 'solid-js/h/jsx-runtime';

export const enum ImageSize {
  Thumb = 0,
  Gallery = 1,
  Focus = 2,
}

const sizeToPath: { [key: number]: string } = {
  1: '_medium',
  0: '_thumbnail',
  2: '',
};

// Get PNG icons
export const getIconPath = (title: string): string => {
  return `./icons/${title}.png`;
};

// Get large WEBP images for gallery and single image view
export const getImagePath = (title: string, size: ImageSize): string => {
  return `./images/${title}${sizeToPath[size]}.avif`;
};

export type ImageProps = {
  id?: string;
  title: string;
  className?: string;
  click?: () => void;
  onload?: any;
};

export const Image = ({ id, title, className, click, onload }: ImageProps) => {
  return (
    <img
      loading="lazy"
      onLoad={onload}
      id={id}
      src={title}
      class={className}
      onclick={click}
    ></img>
  );
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
interface LazyImageProps extends ImageProps {
  parentClass: string;
}
export const LazyImage = (props: LazyImageProps) => {
  const [isVisibile, setVisible] = createSignal<boolean>(false);

  const observer = createObserver((entries) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        console.log(`Intersecting: ${props.title}\n`);
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
        src={isVisibile() ? props.title : undefined}
        id={props.id}
        class={initClass}
        onclick={props.click}
        ref={imageRef}
      />
    </div>
  );
};

// Fade in images
const fullOpacity = 'opacity-100';
export const fadeIn = (id: string, baseClass: string) => {
  return () => {
    const elt = document.getElementById(id);
    if (elt) elt.className = `${baseClass}${fullOpacity}`;
    else throw new Error('Image ID error');
  };
};
