import { AiFillGithub, AiFillLinkedin, AiFillInstagram, AiFillYoutube } from "react-icons/ai";

import { Button } from "../Button";
import { SocialsLinks } from "./SocialsLinks";
import { Waves } from "./Waves";

export function Footer() {
  return (
    <footer className="relative mt-auto w-full h-full bg-transparent sm:bg-[#3b727a] px-2 py-2.5 sm:py-5">
      <Waves />
      <div className="max-w-7xl mx-auto my-0 grid gap-2 grid-cols-3 sm:flex flex-row items-center justify-around text-white">
        <nav className="col-span-1">
          <h3 className="text-sm sm:text-base font-semibold text-center mb-1 sm:mb-1.5">
            Nossas Mídias
          </h3>
          <ul className="flex items-center justify-center gap-1 sm:gap-2.5">
            <SocialsLinks
              url="https://github.com/lokeon22"
              icon={<AiFillGithub className="w-[22px] h-[22px]" />}
            />
            <SocialsLinks
              url="https://gabrielfelipe.tech"
              icon={<AiFillYoutube className="w-[22px] h-[22px]" />}
            />
            <SocialsLinks
              url="https://gabrielfelipe.tech"
              icon={<AiFillInstagram className="w-[22px] h-[22px]" />}
            />
            <SocialsLinks
              url="https://github.com/lokeon22"
              icon={<AiFillLinkedin className="w-[22px] h-[22px]" />}
            />
          </ul>
        </nav>
        <label className="flex flex-col items-center gap-1 sm:gap-0.5 text-xs sm:text-sm col-span-2">
          <span>© LK CARDS | All rights reserved</span>
          <span>Copyright 2023© - Pombal Corp®</span>
        </label>
        <Button
          type="button"
          className="w-2/3 hidden sm:block sm:w-auto mx-auto sm:mx-0 px-2 col-span-3 my-1.5 sm:my-0 bg-[#42929c] uppercase text-sm"
          text="Entrar em contato"
        />
      </div>
    </footer>
  );
}
