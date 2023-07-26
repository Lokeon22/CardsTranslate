import { ComponentProps } from "react";
import { IconBaseProps } from "react-icons/lib/esm/iconBase";

export type ButtonProps = ComponentProps<"button">;
interface BtnIconProps extends ButtonProps {
  icon: IconBaseProps;
  text: string;
}

export function PlayerButton({ icon, text, ...props }: BtnIconProps) {
  return (
    <button
      className="flex items-center gap-2 hover:brightness-90 hover:duration-200"
      type="button"
      {...props}
    >
      <>{icon}</>
      {text}
    </button>
  );
}
