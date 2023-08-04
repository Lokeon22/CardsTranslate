import { ComponentProps } from "react";

type InputNative = ComponentProps<"input">;
interface InputProps extends InputNative {
  text: string;
}

export function Input({ text, ...props }: InputProps) {
  return (
    <>
      <label className="mt-3" htmlFor={text}>
        {text}
      </label>
      <input className="h-8 outline-none rounded p-2" id={text} {...props} />
    </>
  );
}
