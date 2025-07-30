import type { JSX } from "react";
import type { ButtonTypes } from "./types";

export default function Button({
  text,
  onClick,
  type = "button",
  tailwindUtilities,
}: ButtonTypes): JSX.Element {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`text-white bg-default-text px-8 py-3 rounded-3xl tracking-wide w-full hover:bg-default-text/90 active:bg-default-text/80 transition-colors cursor-pointer ${tailwindUtilities}`}
    >
      {text}
    </button>
  );
}
