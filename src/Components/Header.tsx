import { getIconPath } from './Image';

export const Header = () => {
  const navClass =
    'font-palatino tracking-[0.25em] text-sm sm:text-md md:text-lg';
  const dotClass = 'm-0 p-0 text-center text-sm sm:text-md md:text-lg';
  return (
    <header class="mt-2 flex w-screen flex-col items-center justify-center">
      <img
        class="mb-2 aspect-auto h-5/6 w-1/4 object-fill"
        src={getIconPath('logo')}
      />
      <img
        class="mb-2 h-3/4 w-3/4 object-cover md:mb-4"
        src={getIconPath('title')}
      />
      <p class="sm:text-md mb-4 font-palatino text-xs tracking-[0.5em] md:mb-8 md:text-xl">
        Visual Development and Illustration
      </p>
      <div class="flew-row space-between flex justify-between space-x-8">
        <a class={navClass} href="/">
          home
        </a>
        <p class={dotClass}>&#x2022</p>
        <a class={navClass} href="/works">
          personal work
        </a>
        <p class={dotClass}>&#x2022</p>
        <a class={navClass} href="/about">
          about
        </a>
      </div>
    </header>
  );
};
