"use client";
import { useState, useTransition } from "react";
import { useAuth } from "@/context/userContext";
import { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import { userLogout } from "@/app/actions";

import { FiUser, FiLogOut } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

import close from "@/assets/icons/close.svg";
import hamburger from "@/assets/icons/menu.svg";
import { Links } from "../Links";

export function Menu() {
  const { user, setUser } = useAuth();
  const { push } = useRouter();
  const [menu, setMenu] = useState<boolean>(false);
  let [isPending, startTransition] = useTransition();

  const handleMenu = () => setMenu(!menu);

  const logoutCookie = () => {
    destroyCookie(null, "lk_user", { path: "/" }), destroyCookie(null, "lk_token", { path: "/" });
    setUser(undefined);
    menu && setMenu(false);
    push("/");
  };

  return (
    <>
      {user ? (
        <>
          <ul className="hidden sm:flex items-center gap-5 text-sm uppercase">
            <li className="hover:brightness-90 hover:duration-200">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="hover:brightness-90 hover:duration-200">
              <Link href={"/profile"}>Perfil</Link>
            </li>
            <li className="hover:brightness-90 hover:duration-200">
              <Link href={"/chat"}>Chat</Link>
            </li>
            <li className="hover:brightness-90 hover:duration-200">
              <Link href={"/mycards"}>Meus cards</Link>
            </li>
            <li
              onClick={() => {
                logoutCookie();
                startTransition(() => userLogout());
              }}
              className="hover:brightness-90 hover:duration-200 hover:cursor-pointer"
            >
              <FiLogOut className="w-5 h-5" />
            </li>
          </ul>
          {menu ? (
            <nav className="relative w-auto">
              <Image
                onClick={handleMenu}
                className="w-4 h-4 mr-1"
                src={close}
                alt="Menu close icon"
              />
              <ul className="z-10 absolute top-11 -right-2 px-2 pb-3 flex flex-col gap-3 w-screen bg-black animate-changeOpacity">
                <Links text="Home" url="/" setMenu={setMenu} />
                <Links text="Chat" url="/chat" setMenu={setMenu} />
                <Links text="Meus cards" url="/mycards" setMenu={setMenu} />
                <Links text="Perfil" url="/profile" setMenu={setMenu} />
                <li
                  onClick={logoutCookie}
                  className="hover:brightness-90 hover:duration-200 hover:cursor-pointer"
                >
                  <FiLogOut className="w-5 h-5" />
                </li>
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
      ) : (
        <nav className="flex items-center gap-2">
          <FiUser className="w-5 h-5" />
          <Link className="text-sm" href={"/login"}>
            Entre ou cadastre-se
          </Link>
        </nav>
      )}
    </>
  );
}
