import { getIconPath } from './Image';

export const Header = () => {
  const textSizing = "text-xxs sm:text-xs md:text-sm lg:text-md xl:text-lg"
  const navClass =
    `font-palatino tracking-[0.25em] ${textSizing}`;
  const dotClass = `m-0 p-0 text-center ${textSizing}`;
  return (
    <header class="mt-8 flex w-screen flex-col items-center justify-center mb-8 md:mb-24">
      <img
        alt="Logo"
        class="mb-2 aspect-auto h-5/6 w-1/4 object-fill"
        src={getIconPath('logo')}
      />
      <img
        alt="Name icon"
        class="mb-2 h-3/4 w-8/12 sm:w-1/2 object-cover"
        src={getIconPath('title')}
      />
      <p class={`mb-4 font-palatino tracking-[0.5em] md:mb-8 ${textSizing}`}>
        Visual Development and Illustration
      </p>
      <div class="flew-row space-between flex justify-between space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-10 xl:space-x-12">
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
