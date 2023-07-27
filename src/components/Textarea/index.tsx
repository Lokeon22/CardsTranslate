import { ComponentProps } from "react";

type TextAreaProps = ComponentProps<"textarea">;
interface TAProps extends TextAreaProps {
  textRef: React.MutableRefObject<HTMLTextAreaElement>;
}

export function TextArea({ textRef, ...props }: TAProps) {
  return (
    <textarea
      className="w-full sm:min-w-[400px] h-28 bg-white border border-gray-300 outline-none rounded p-2 resize-none"
      ref={textRef}
      {...props}
    />
  );
}
