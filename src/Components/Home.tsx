import { createSignal, For, Setter, Show } from 'solid-js';
import { ImageSize, LazyImage, getImagePath } from './Image';
import { Page, type PageFocus } from '../lib';
import { FocusImage } from './Focus';

type Image = { title: string; layout: string };
const sectionSeparator = 'mt-12 md:mt-16 lg:mt-32';
const images: Image[] = [
  { title: 'superpower', layout: 'col-span-4 md:col-span-2 md:col-start-2' },
  { title: 'dino', layout: 'col-span-4' },
  { title: 'painting', layout: 'col-span-2' },
  { title: 'widdo', layout: `col-span-2` },
  { title: 'mira', layout: `col-span-4 md:col-span-2 md:col-start-2 ${sectionSeparator}`},
  { title: 'mirror', layout: `col-span-4` },
  { title: 'character', layout: 'col-span-2' },
  { title: 'guy', layout: 'col-span-2' },
  { title: 'void', layout: `col-span-4` },
  { title: 'tree', layout: `col-span-4 ${sectionSeparator}` },
  { title: 'tree-bw', layout: `col-span-2 col-start-2` },
  { title: 'porch', layout: `col-span-4 ${sectionSeparator}` },
  { title: 'porch-value', layout: `col-span-2` },
  { title: 'porch-sketch', layout: `col-span-2` },
  { title: 'barn', layout: `col-span-4 ${sectionSeparator}` },
  { title: 'owl', layout: 'col-span-4' },
];

type GalleryProps = {
  onClick: Setter<PageFocus>;
};

const galleryImageBaseClass = (shadow: boolean) => `${shadow ? 'shadow-md' : ''} w-full h-auto`;

const Gallery = ({ onClick }: GalleryProps) => {
  return (
    <div class="mx-12 mb-16 mt-8 grid grid-cols-4 gap-4 bg-slate-50">
      <For each={images}>
        {({ title, layout }) => {
          return (
            <LazyImage
              parentClass={`h-auto w-auto ${layout}`}
              id={title}
              title={getImagePath(title, ImageSize.Gallery, Page.Home)}
              click={() => {
                onClick(title);
              }}
              className={galleryImageBaseClass(!(title === 'mira' || title === 'superpower'))}
            />
          );
        }}
      </For>
    </div>
  );
};

export const Home = () => {
  const [focus, setFocus] = createSignal<PageFocus>(null);
  return (
    <div class="bg-slate-50">
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
    </div>
  );
};

export default Home;
