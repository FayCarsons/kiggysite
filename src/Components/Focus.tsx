import { Ref, Setter, createSignal, onMount } from 'solid-js';
import { type Image } from './Home';
import { Page, PageFocus, bound, titleToURI_AVIF } from '../lib';
import { Left, Right } from './Icons';

type FocusProps = {
  focus: PageFocus;
  page: Page;
  index: string[];
  onClick: Setter<PageFocus | null>;
};

const focusBaseClass = 'w-auto max-h-screen';

export const FocusImage = (props: FocusProps) => {
  const { focus, page, index, onClick } = props;
  const [current, setCurrent] = createSignal(focus);

  let imageRef: Ref<HTMLImageElement> | undefined;

  onMount(() => {
    if (imageRef) {
      (imageRef as HTMLImageElement).onload = () => {
        (imageRef as HTMLImageElement).scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'center',
        });
      };
    }
  });

  const next = () => {
    console.log('next');
    setCurrent((i) => bound(i + 1, index.length));
  };

  const last = () => {
    console.log('last');
    setCurrent((i) => bound(i - 1, index.length));
  };

  return (
    <div class="my-16 flex h-screen flex-row items-center justify-center">
      <button class="" onClick={last}>
        <Left className="h-6 w-6" />
      </button>
      <div class="mx-4 flex flex-col items-center justify-center">
        <img
          id={index[current()]}
          src={titleToURI_AVIF(index[current()], page)}
          class={focusBaseClass}
          onClick={() => onClick(null)}
          ref={imageRef}
        />
      </div>
      <button class="" onClick={next}>
        <Right className="h-6 w-6" />
      </button>
    </div>
  );
};
