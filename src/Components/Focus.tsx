import { Ref, Setter, onCleanup, onMount } from "solid-js";
import { PageFocus } from "../lib";
import { ImageSize, getImagePath } from "./Image";

type FocusProps = {
  title: string;
  onClick: Setter<PageFocus>;
};

const focusBaseClass = "w-auto max-h-screen";

export const FocusImage = ({ title, onClick }: FocusProps) => {
  let imageRef: Ref<HTMLImageElement> | undefined = undefined;

  onMount(() => {
    if (imageRef) {
      (imageRef as HTMLImageElement).onload = () => {
        (imageRef as HTMLImageElement).scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "center",
        });
      };
    }

    window.onmousedown = () => onClick(null)
  });

  onCleanup(() => window.onmousedown = null)

  return (
    <div class="my-16 flex h-screen flex-col justify-start">
      <div class="mx-4 flex flex-col items-center justify-center">
        <img
          id={title}
          src={getImagePath(title, ImageSize.Focus)}
          class={focusBaseClass}
          onClick={() => onClick(null)}
          ref={imageRef}
        />
      </div>
    </div>
  );
};
