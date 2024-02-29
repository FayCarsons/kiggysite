import { Ref, createSignal, onCleanup, Show } from 'solid-js';
import { Page, imageSizeMap } from '../lib'
import { ImageSizing, Resolution } from '../image-types';

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
  //console.log(props.title, ":\n");
  //console.table(sizes);

  const wWidth = window.innerWidth;

  let resolution: Resolution;


  if (props.title !== 'mira' && props.title !== 'superpower') {
    if (wWidth < 480) resolution = sizes['small'];
    else if (wWidth < 768) resolution = sizes['medium'];
    else if (wWidth < 1200) resolution = sizes['large'];
    else resolution = sizes['original'];
  } else {
    resolution = { width: 1200, height: 400 };
  }

  //console.log(`Resolution of image ${props.title} is ${resolution.width}x${resolution.height}`);

  const { width, height } = resolution;

  const paths = {
    original: `./images/${props.page.valueOf()}/${props.title}.avif`,
    large: `./images/${props.page.valueOf()}/${props.title}_large.avif`,
    medium: `./images/${props.page.valueOf()}/${props.title}_medium.avif`,
    small: `./images/${props.page.valueOf()}/${props.title}_small.avif`
  };

  return (
    <div class={props.parentClass} ref={containerRef}>
      <picture>
        <source media='(min-width: 1200px)' srcset={paths['original']} type='image/avif' />
        <source media='(min-width: 768px)' srcset={paths['large']} type='image/avif' />
        <source media='(min-width: 480px)' srcset={paths['medium']} type='image/avif' />
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
