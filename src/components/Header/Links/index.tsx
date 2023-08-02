import Link from "next/link";

export function Links({
  setMenu,
  text,
  url,
}: {
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  url: string;
}) {
  return (
    <li className="hover:brightness-90 hover:duration-200 uppercase text-sm">
      <Link onClick={() => setMenu(false)} href={url}>
        {text}
      </Link>
    </li>
  );
}
