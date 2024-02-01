import { Accessor, Setter } from 'solid-js';
import { PageFocus, always } from '../lib';
import { Image, ImageSize, fadeIn, getImagePath } from './Image';

type FocusProps = {
  title: string;
  onClick: Setter<PageFocus>;
};

const focusBaseClass = 'w-auto max-h-screen';

export const FocusImage = ({ title, onClick }: FocusProps) => {
  const path = getImagePath(title, ImageSize.Focus);
  return (
    <div class="my-16 flex h-screen flex-col justify-start">
      <div class="mx-4 flex flex-col items-center justify-center">
        <Image
          // This component only renders when state is not null so we can cast
          // it to a string safely
          id={title}
          title={path}
          className={focusBaseClass}
          click={() => onClick(null)}
        />
      </div>
    </div>
  );
};
