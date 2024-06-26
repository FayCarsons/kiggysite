import { Page, type PageFocus } from '../lib';
import { For, Setter, Show, createSignal } from 'solid-js';
import { ImageSize, LazyImage } from './Image';
import { FocusImage } from './Focus';

const heavyJan = [
  'hj_block',
  'hj_laundry',
  'hj_aquarium',
  'hj_flowers',
  'hj_beach',
  'hj_restaurant',
  'hj_pond',
  'hj_couch',
  'hj_forest',
  'hj_liminal',
  'hj_glacier',
  'hj_bathroom',
  'hj_river',
  'hj_trees',
  'hj_kitchen',
  'hj_graffiti',
  'hj_impress',
  'hj_sunset',
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

const enum TopMargin {
  Large = 'mt-16 lg:mt-32',
  Small = 'mt-4 lg:mt-8',
}

// Section Sub-header
type SectionProps = {
  title: string;
  topMargin: TopMargin;
};
const Section = (props: SectionProps) => {
  return (
    <div
      class={`mb-2 ${props.topMargin.valueOf()} flex w-full flex-col items-center justify-center`}
    >
      <h2 class="font-palatino text-lg tracking-widest text-black md:text-2xl lg:text-3xl">
        {props.title}
      </h2>
      <hr class="mb-4 mt-2 w-4/12 border-black lg:w-3/12"></hr>
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
    <section class="mx-12 grid grid-cols-4 gap-2">
      <For each={heavyJan}>
        {(title) => (
          <LazyImage
            parentClass="aspect-square"
            title={title}
            className={hjImageBaseClass}
            click={() => props.click(title)}
            page={Page.Works}
          />
        )}
      </For>
    </section>
  );
};

const PersonalWorks = (props: GalleryProps) => {
  return (
    <section class="mx-12 mb-8 grid grid-cols-4 gap-4 lg:mb-16">
      <For each={personal}>
        {({ title, layout }) => (
          <LazyImage
            parentClass={layout}
            title={title}
            className="h-auto w-full"
            click={() => props.click(title)}
            page={Page.Works}
          />
        )}
      </For>
    </section>
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
            <Section title="#heavyjan2024" topMargin={TopMargin.Small} />
            <HeavyJan click={setFocus} />
            <Section title="Personal works" topMargin={TopMargin.Large} />
            <PersonalWorks click={setFocus} />
          </div>
        }
      >
        <FocusImage
          title={focus() as string}
          onClick={() => setFocus(null)}
          page={Page.Works}
        ></FocusImage>
      </Show>
    </>
  );
};

export default Works;
