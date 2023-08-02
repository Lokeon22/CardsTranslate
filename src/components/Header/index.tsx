import Link from "next/link";
import { Menu } from "./Menu";

export function Header() {
  return (
    <header className="w-full h-[72px] sm:h-24 bg-black text-white">
      <div className="max-w-7xl h-full flex items-center justify-between mx-auto my-0 px-2 sm:px-4">
        <Link href={"/"} className="text-lg sm:text-2xl font-bold border-2 border-r-0 p-1">
          LK Cards
        </Link>
        <Menu />
      </div>
    </header>
  );
}
