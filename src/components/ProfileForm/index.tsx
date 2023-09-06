"use client";
import { useState } from "react";
import { updateProfile } from "@/app/actions";
import { FiUser } from "react-icons/fi";
import { AiOutlineMail, AiFillCamera } from "react-icons/ai";

import Image, { StaticImageData } from "next/image";
import avatardefault from "@/assets/icons/avatardefault.png";
import bgdevil from "@/assets/icons/devil2.jpg";

import { InputIcon } from "./InputIcon";
import { Button } from "../Button";
import { notify } from "@/functions/notify";

interface ProfileFormProps {
  children: React.ReactNode;
  avatar: string | null;
}

export function ProfileForm({ children, avatar }: ProfileFormProps) {
  const avatarURL = avatar ? `${process.env.NEXT_PUBLIC_API_URL}/files/${avatar}` : avatardefault;

  const [useravatar, setUseravatar] = useState<string | StaticImageData>(avatarURL);
  const [avatarFile, setAvatarFile] = useState<File>();

  function handleChangeAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.currentTarget || !e.currentTarget.files) return;
    const file = e.currentTarget.files[0];
    setAvatarFile(file);

    const imagePreview = URL.createObjectURL(file);
    setUseravatar(imagePreview);
  }

  return (
    <>
      <div className="flex justify-start items-center flex-wrap relative gap-1.5 sm:gap-2 p-2.5">
        <Image
          className="w-full h-full absolute rounded-xl -z-50"
          style={{ objectFit: "cover", objectPosition: "center" }}
          src={avatar ? `${process.env.NEXT_PUBLIC_API_URL}/files/${avatar}` : bgdevil}
          alt="user_background"
          priority
          fill
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvmhRPQAGTwJs6OQmwAAAAABJRU5ErkJggg=="
        />
        <Image
          width={120}
          height={120}
          className="w-32 sm:w-40 h-32 sm:h-40 rounded-full border-2 border-white relative top-24 sm:top-14"
          src={useravatar}
          alt="user avatar"
          priority
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvmhRPQAGTwJs6OQmwAAAAABJRU5ErkJggg=="
        />
        {children}
      </div>
      <form className="max-w-md flex flex-col gap-4 relative mt-20 sm:mt-14" action={updateProfile}>
        <div className="w-max absolute -top-1/2 left-[29%]">
          <AiFillCamera className="w-7 sm:w-8 sm:h-8 h-7 text-[#42929c] relative z-20 cursor-pointer" />
          <input
            type="file"
            className="w-full absolute left-0 top-0 opacity-0 z-20"
            onChange={handleChangeAvatar}
            name="avatar"
          />
        </div>
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
      </form>
    </>
  );
}
