import { IconBaseProps } from "react-icons/lib/esm/iconBase";
import Link from "next/link";

export function SocialsLinks({ icon, url }: { icon: IconBaseProps; url: string }) {
  return (
    <li>
      <Link className="hover:brightness-90 hover:duration-200" target="_blank" href={url}>
        <>{icon}</>
      </Link>
    </li>
  );
}
