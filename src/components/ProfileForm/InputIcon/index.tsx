import { ComponentProps } from "react";
import { IconBaseProps } from "react-icons/lib/esm/iconBase";

type InputProps = ComponentProps<"input">;
interface InpIconsProps extends InputProps {
  icon: IconBaseProps;
}

export function InputIcon({ icon, ...props }: InpIconsProps) {
  return (
    <div className="relative">
      <input className="w-full h-8 outline-none rounded py-2 px-8" {...props} />
      <>{icon}</>
    </div>
  );
}
