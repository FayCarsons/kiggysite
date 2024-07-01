import { Ref, createSignal, onCleanup, Show, onMount } from 'solid-js';
import { Page, imageSizeMap } from '../lib';
import { Resolution } from '../image-types.ts';

// Get AVIF icons
export const getIconPath = (title: string): string => {
  return `./icons/${title}.avif`;
};

function createObserver(
  callback: (_: any) => any,
  options = {},
): IntersectionObserver {
  const defaultOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px',
  };
  return new IntersectionObserver(callback, { ...defaultOptions, ...options });
}

// Lazy loaded image that loads on intersection w/ viewport, and then fades
// opacity in once image is loaded
interface LazyImageProps {
  id?: string;
  title: string;
  page: Page;
  className?: string;
  click?: () => void;
  parentClass: string;
}

export const LazyImage = ({
  id,
  title,
  page,
  className,
  click,
  parentClass,
}: LazyImageProps) => {
  const [isVisible, setVisible] = createSignal<boolean>(false);

  let observer: IntersectionObserver;
  let imageRef: HTMLImageElement;

  onMount(() => {
    observer = createObserver((entries) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    });
    if (imageRef) observer.observe(imageRef);
  });

  const baseClass = `${className} transition-opacity duration-300 ease-in`;
  const initClass = `${baseClass} opacity-0`;
  const loadClass = `${baseClass} opacity-100`;

  onCleanup(() => {
    if (observer) observer.disconnect();
  });

  const sizes = imageSizeMap[page][title];

  const wWidth = window.innerWidth;

  let resolution: Resolution;

  const medium = 481;
  const large = 1025;

  if (wWidth < medium) resolution = sizes.small;
  else if (wWidth < large) resolution = sizes.medium;
  else resolution = sizes.large;

  const { width, height } = resolution;

  const paths = {
    large: `./images/${page}/${title}_large.avif`,
    medium: `./images/${page}/${title}_medium.avif`,
    small: `./images/${page}/${title}_small.avif`,
  };

  const alt =
    {
      mira: "title card for project 'Mira'",
      superpower: "title card for project 'superpower'",
    }[title] ?? `A digital art piece titled \"${title}\"`;

  return (
    <div class={parentClass}>
      <picture>
        <source
          media={`(min-width: ${large}px)`}
          srcset={paths['large']}
          type="image/avif"
        />
        <source
          media={`(min-width: ${medium}px)`}
          srcset={paths['medium']}
          type="image/avif"
        />
        <img
          src={paths['small']}
          alt={alt}
          id={id}
          class={initClass}
          onclick={click}
          ref={(el) => {
            imageRef = el;
            if (el)
              el.onload = () => {
                el.className = loadClass;
              };
          }}
          width={width}
          height={height}
        />
      </picture>
    </div>
  );
};
