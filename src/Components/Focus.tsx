import { Ref, Setter, onCleanup, onMount } from "solid-js";
import { Page, PageFocus } from "../lib";
import { ImageSize } from "./Image";

type FocusProps = {
  title: string;
  page: Page,
  onClick: Setter<PageFocus>;
};

const focusBaseClass = "w-auto max-h-screen";

export const FocusImage = ({ title, page, onClick }: FocusProps) => {
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
          src={`images/${page}/${title}.avif`}
          class={focusBaseClass}
          onClick={() => onClick(null)}
          ref={imageRef}
        />
      </div>
    </div>
  );
};
