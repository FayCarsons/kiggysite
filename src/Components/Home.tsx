import { createSignal, For, Setter, Show } from 'solid-js';
import { LazyImage } from './Image';
import { Page, type PageFocus } from '../lib';
import { FocusImage } from './Focus';

type S = {}
type Image = {
  title: string,
  layout: string
}
type LayoutElement = S | Image
const Separator: S = {}

const sectionSeparator = 'mt-12 md:mt-16 lg:mt-32';
const images: LayoutElement[] = [
  { title: 'superpower', layout: 'col-span-4 md:col-span-2 md:col-start-2' },
  { title: 'dino', layout: 'col-span-4' },
  { title: 'painting', layout: 'col-span-2' },
  { title: 'widdo', layout: `col-span-2` },
  { title: 'mira', layout: `col-span-4 md:col-span-2 md:col-start-2 ${sectionSeparator}` },
  { title: "mira-rows", layout: `col-span-4` },
  { title: 'mirror', layout: `col-span-4` },
  { title: 'character', layout: 'col-span-4' },
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

type GalleryProps = {
  onClick: Setter<PageFocus>;
};

const galleryImageBaseClass = `w-full h-auto`;

const handleLayoutElt = (onClick: Setter<PageFocus>) => (elt: LayoutElement) => {
  if (elt == Separator) {
    return (
      <div class='col-span-4'>
        <hr class='w-1/2 border-1 mx-auto border-black my-8 md:my-12 lg:my-16'></hr>
      </div>
    )
  } else {
    // @ts-ignore
    const { title, layout } = elt;
    return (
      <LazyImage
        parentClass={`h-auto w-auto ${layout}`}
        id={title}
        title={title}
        page={Page.Home}
        click={() => {
          if (title === 'mira' || title === 'superpower') return;
          onClick(title);
        }}
        className={galleryImageBaseClass}
      />
    )
  }
}

const Gallery = ({ onClick }: GalleryProps) => {
  const handleElt = handleLayoutElt(onClick);
  return (
    <div class="mx-12 mb-16 mt-8 grid grid-cols-4 gap-6 lg:gap-8 bg-slate-50">
      <For each={images}>
        {handleElt}
      </For>
    </div>
  );
};

export const Home = () => {
  const [focus, setFocus] = createSignal<PageFocus>(null);
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
        <FocusImage title={focus() as string} onClick={setFocus} page={Page.Home} />
      </Show>
    </section>
  );
};

export default Home;
