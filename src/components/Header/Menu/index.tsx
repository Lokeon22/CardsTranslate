"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import close from "@/assets/icons/close.svg";
import hamburger from "@/assets/icons/menu.svg";
import { Links } from "../Links";

export function Menu() {
  const [menu, setMenu] = useState<boolean>(false);

  const handleMenu = () => setMenu(!menu);

  return (
    <>
      <ul className="hidden sm:flex items-center gap-5 text-sm uppercase">
        <li className="hover:brightness-90 hover:duration-200">
          <Link href={"/"}>Home</Link>
        </li>
        <li className="hover:brightness-90 hover:duration-200">
          <Link href={"/"}>Perfil</Link>
        </li>
        <li className="hover:brightness-90 hover:duration-200">
          <Link href={"/mycards"}>Meus cards</Link>
        </li>
      </ul>
      {menu ? (
        <nav className="relative w-auto">
          <Image onClick={handleMenu} className="w-4 h-4 mr-1" src={close} alt="Menu close icon" />
          <ul className="z-10 absolute top-11 -right-2 px-2 pb-3 flex flex-col gap-3 w-screen bg-black animate-changeOpacity">
            <Links text="Home" url="/" setMenu={setMenu} />
            <Links text="Meus cards" url="/mycards" setMenu={setMenu} />
            <Links text="Perfil" url="/" setMenu={setMenu} />
          </ul>
        </nav>
      ) : (
        <Image
          onClick={handleMenu}
          className="block sm:hidden w-5 h-5 animate-rotateMenu"
          src={hamburger}
          alt="Menu icon"
        />
      )}
    </>
  );
}
