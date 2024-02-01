import { Header } from './Header';
import type { PageFocus } from '../lib';
import { For, Setter, Show, createSignal } from 'solid-js';
import { ImageSize, LazyImage, fadeIn, getImagePath } from './Image';
import { FocusImage } from './Focus';

const heavyJan = [
  'hj_snowpond',
  'hj_glacier',
  'hj_pond',
  'hj_kitchen',
  'hj_trees',
  'hj_liminal',
  'hj_beach',
  'hj_block',
  'hj_laundry',
  'hj_aquarium',
  'hj_couch',
  'hj_bathroom',
  'hj_forest',
  'hj_flowers',
  'hj_snow',
  'hj_graffiti',
  'hj_river',
  'hj_restaurant',
];

// Grouped together by layout in UI
const personal = [
  { title: 'god', layout: 'col-span-4' },

  { title: 'red', layout: 'col-span-2' },
  { title: 'tears', layout: 'col-span-2' },

  { title: 'spiral', layout: 'col-span-4' },

  { title: 'bells', layout: 'col-span-2' },
  { title: 'sid', layout: 'col-span-2' },

  { title: 'moth', layout: 'col-span-2' },
  { title: 'groove', layout: 'col-span-2' },

  { title: 'sailor', layout: 'col-span-2' },
  { title: 'cat', layout: 'col-span-2' },

  { title: 'ethan', layout: 'col-span-2' },
  { title: 'ethan2', layout: 'col-span-2' },

  { title: 'note', layout: 'col-span-4' },
];

// Section Sub-header
type SectionProps = {
  title: string;
};
const Section = (props: SectionProps) => {
  return (
    <div class="mb-2 mt-8 flex w-full flex-col items-center justify-center">
      <h2 class="font-palantino text-2xl tracking-widest text-black">
        {props.title}
      </h2>
      <hr class="mb-4 mt-2 w-1/2 border-black"></hr>
    </div>
  );
};

// HeavyJan Section
const hjImageBaseClass = 'object-cover w-full h-full shadow-sm';
type GalleryProps = {
  click: Setter<PageFocus>;
};
const HeavyJan = (props: GalleryProps) => {
  return (
    <div class="mx-12 grid grid-cols-4 gap-2">
      <For each={heavyJan}>
        {(title) => (
          <LazyImage
            parentClass="aspect-square"
            title={getImagePath(title, ImageSize.Gallery)}
            className={hjImageBaseClass}
            click={() => props.click(title)}
          />
        )}
      </For>
    </div>
  );
};

const PersonalWorks = (props: GalleryProps) => {
  return (
    <div class="mx-12 grid grid-cols-4 gap-4">
      <For each={personal}>
        {({ title, layout }) => (
          <LazyImage
            parentClass={layout}
            title={getImagePath(title, ImageSize.Gallery)}
            className="h-auto w-full"
            click={() => props.click(title)}
          />
        )}
      </For>
    </div>
  );
};

export const Works = () => {
  const [focus, setFocus] = createSignal<PageFocus>(null);

  return (
    <>
      <Show
        when={focus()}
        fallback={
          <div class="mb-12 flex flex-col items-center justify-center">
            <Section title="#HeavyJan2024" />
            <HeavyJan click={setFocus} />
            <Section title="Personal works" />
            <PersonalWorks click={setFocus} />
          </div>
        }
      >
        <FocusImage
          title={focus() as string}
          onClick={() => setFocus(null)}
        ></FocusImage>
      </Show>
    </>
  );
};

export default Works;
