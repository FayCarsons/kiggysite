import { createSignal, For, Setter, Show } from 'solid-js';
import { ImageSize, LazyImage, getImagePath } from './Image';
import { Page, type PageFocus } from '../lib';
import { FocusImage } from './Focus';

type Image = { title: string; layout: string };
const sectionSeparator = 'mt-12 md:mt-16 lg:mt-32';
const images: Image[] = [
  { title: 'dino', layout: 'col-span-4' },
  { title: 'painting', layout: 'col-span-2' },
  { title: 'widdo', layout: `col-span-2` },
  { title: 'mirror', layout: `col-span-4 ${sectionSeparator}` },
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

const galleryImageBaseClass = 'shadow-sm w-auto h-auto';

const Gallery = ({ onClick }: GalleryProps) => {
  return (
    <div class="mx-12 mb-16 mt-8 grid grid-cols-4 gap-4 bg-slate-50">
      <For each={images}>
        {({ title, layout }) => {
          return (
            <LazyImage
              parentClass={`max-h-fit ${layout}`}
              id={title}
              title={getImagePath(title, ImageSize.Gallery, Page.Home)}
              click={() => {
                onClick(title);
              }}
              className={galleryImageBaseClass}
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
