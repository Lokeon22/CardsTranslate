"use client";
import { useState } from "react";
import { updateProfile } from "@/app/actions";
import { FiUser } from "react-icons/fi";
import { AiOutlineMail, AiFillCamera } from "react-icons/ai";

import { handleImages } from "@/functions/handleImages";

import Image, { StaticImageData } from "next/image";

import avatardefault from "@/assets/icons/avatardefault.png";
import bgdevil from "@/assets/icons/devil2.jpg";

import { InputIcon } from "./InputIcon";
import { Button } from "../Button";
import { notify } from "@/functions/notify";

import { UserProps } from "@/@types/User";

export function ProfileForm({ user }: { user: UserProps }) {
  const avatarURL = user.avatar
    ? `${process.env.NEXT_PUBLIC_API_URL}/files/${user.avatar}`
    : avatardefault;

  const backgroundURL = user.background
    ? `${process.env.NEXT_PUBLIC_API_URL}/files/${user.background}`
    : bgdevil;

  const [useravatar, setUseravatar] = useState<string | StaticImageData>(avatarURL);
  const [avatarFile, setAvatarFile] = useState<File>();

  const [background, setBackground] = useState<string | StaticImageData>(backgroundURL);
  const [backgroundFile, setBackgroundFile] = useState<File>();

  return (
    <>
      <form action={updateProfile}>
        <section className="relative flex justify-start items-center gap-1.5 sm:gap-2 p-1 sm:p-2.5">
          <Image
            className="w-full h-full absolute rounded-xl -z-50 drop-shadow"
            style={{ objectFit: "cover", objectPosition: "center" }}
            src={background}
            alt="user_background"
            priority
            fill
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvmhRPQAGTwJs6OQmwAAAAABJRU5ErkJggg=="
          />
          <div className="w-max absolute right-2 sm:right-3 bottom-[88%] sm:-bottom-[18px]">
            <AiFillCamera className="w-7 sm:w-8 sm:h-8 h-7 text-orange-600 relative z-20 cursor-pointer" />
            <input
              type="file"
              className="w-full absolute left-0 top-0 opacity-0 z-20"
              onChange={(e) =>
                handleImages({ e, setFile: setBackgroundFile, setImage: setBackground })
              }
              name="background"
            />
          </div>
          <div className="relative">
            <Image
              width={120}
              height={120}
              className="min-w-[128px] sm:w-40 h-32 sm:h-40 rounded-full border-2 border-white relative top-20 sm:top-14"
              src={useravatar}
              alt="user avatar"
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvmhRPQAGTwJs6OQmwAAAAABJRU5ErkJggg=="
            />
            <div className="absolute right-0 -bottom-[67px] sm:-bottom-11">
              <AiFillCamera className="w-7 sm:w-8 sm:h-8 h-7 text-[#42929c] relative z-20 cursor-pointer" />
              <input
                type="file"
                className="w-full absolute left-0 top-0 opacity-0 z-20"
                onChange={(e) =>
                  handleImages({ e, setFile: setAvatarFile, setImage: setUseravatar })
                }
                name="avatar"
              />
            </div>
          </div>
          <div className="w-max relative flex-wrap top-20 sm:top-[46px] left-0.5 sm:left-3 flex self-end items-end gap-1.5 sm:gap-4 p-1 rounded sm:rounded-b bg-gray-100">
            <h2 className="text-lg font-medium">{user.name}</h2>
            <p className="text-sm sm:text-base">{user.email}</p>
          </div>
        </section>
        <div className="max-w-md flex flex-col gap-4 relative mt-24 sm:mt-14">
          <InputIcon
            type="text"
            name="name"
            placeholder="Nome"
            icon={<FiUser className="w-5 h-5 absolute top-1.5 left-1.5" />}
          />
          <InputIcon
            type="email"
            name="email"
            placeholder="Email"
            icon={<AiOutlineMail className="w-5 h-5 absolute top-1.5 left-1.5" />}
          />

          <Button
            onClick={() => notify({ message: "Perfil atualizado", time: 1500 })}
            type="submit"
            text="Salvar"
            className="bg-[#42929c]"
          />
        </div>
      </form>
    </>
  );
}
