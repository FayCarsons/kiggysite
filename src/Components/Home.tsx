import { createSignal, For, Setter, Show, Accessor } from 'solid-js';
import { LazyImage } from './Image';
import { Page, type PageFocus } from '../lib';
import { FocusImage } from './Focus';

type S = {};
export type Image = {
  title: string;
  layout: string;
};
type LayoutElement = S | Image;
export const Separator: S = {};

const sectionSeparator = 'mt-12 md:mt-16 lg:mt-32';
const images: LayoutElement[] = [
  { title: 'superpower', layout: 'col-span-4 md:col-span-2 md:col-start-2' },
  { title: 'dino', layout: 'col-span-4' },
  { title: 'painting', layout: 'col-span-2' },
  {
    title: 'widdo',
    layout: `col-span-2 flex flex-col items-center justify-center`,
  },
  {
    title: 'mira',
    layout: `col-span-4 md:col-span-2 md:col-start-2 ${sectionSeparator}`,
  },
  { title: 'mira-rows', layout: `col-span-4` },
  { title: 'mirror', layout: `col-span-4` },
  { title: 'character', layout: 'col-span-2' },
  {
    title: 'guy',
    layout:
      'col-span-2 flex flex-col items-center justify-center',
  },
  { title: 'mira-bw1', layout: 'col-span-2' },
  { title: 'mira-bw2', layout: 'col-span-2' },
  Separator,
  { title: 'hj_snowpond', layout: 'col-span-4' },
  { title: 'hj_snow', layout: 'col-span-4' },
  { title: 'tree', layout: `col-span-4` },
  { title: 'tree-bw', layout: `col-span-4` },
  { title: 'porch', layout: `col-span-4 ${sectionSeparator}` },
  { title: 'barn', layout: `col-span-4` },
  { title: 'owl', layout: `col-span-4` },
];

// 'index' of images for focused click-through gallery
const index: string[] = images
  .filter(
    (elt) =>
      elt != Separator &&
      (elt as Image).title !== 'mira' &&
      (elt as Image).title !== 'superpower',
  )
  .map((elt) => (elt as Image).title);

type GalleryProps = {
  onClick: Setter<PageFocus | null>;
};

const galleryImageBaseClass = `w-full h-auto`;

const handleLayoutElt =
  (onClick: Setter<PageFocus | null>) => (elt: LayoutElement) => {
    if (elt == Separator) {
      return (
        <div class="col-span-4">
          <hr class="border-1 mx-auto my-8 w-1/2 border-black md:my-12 lg:my-16"></hr>
        </div>
      );
    } else {
      // @ts-ignore
      const { title, layout } = elt;
      return (
        <LazyImage
          parentClass={`h-auto w-full ${layout}`}
          id={title}
          title={title}
          page={Page.Home}
          click={() => {
            if (title === 'mira' || title === 'superpower') return;
            onClick(index.indexOf(title));
          }}
          className={galleryImageBaseClass}
        />
      );
    }
  };

const Gallery = ({ onClick }: GalleryProps) => {
  const handleElt = handleLayoutElt(onClick);
  return (
    <div class="mx-12 mb-16 mt-8 grid grid-cols-4 gap-6 bg-slate-50 lg:gap-8">
      <For each={images}>{handleElt}</For>
    </div>
  );
};

export const Home = () => {
  const [focus, setFocus] = createSignal<PageFocus | null>(null);

  return (
    <section class="bg-slate-50">
      <Show
        when={focus()}
        fallback={
          <>
            <Gallery onClick={setFocus} />
          </>
        }
      >
        <FocusImage
          focus={focus() as number}
          index={index}
          onClick={setFocus}
          page={Page.Home}
        />
      </Show>
    </section>
  );
};

export default Home;
