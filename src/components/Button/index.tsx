import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ComponentProps<"button">;
interface BtnProps extends ButtonProps {
  text: string;
}

export function Button({ text, className, ...props }: BtnProps) {
  return (
    <button
      className={twMerge(
        "w-full h-8 text-white rounded hover:brightness-90 hover:duration-200",
        className
      )}
      {...props}
    >
      {text}
    </button>
  );
}
