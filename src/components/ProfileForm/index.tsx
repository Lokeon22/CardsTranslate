"use client";
import { useState } from "react";
import { updateProfile } from "@/app/actions";
import { FiUser } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";

import Image, { StaticImageData } from "next/image";
import avatardefault from "@/assets/icons/avatardefault.png";

import { InputIcon } from "./InputIcon";
import { Button } from "../Button";

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
      <div className="flex justify-center items-center gap-2 sm:gap-2.5 flex-wrap">
        <Image
          width={120}
          height={120}
          className="w-32 sm:w-40 h-32 sm:h-40 rounded-full"
          src={useravatar}
          alt="user avatar"
          priority
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvmhRPQAGTwJs6OQmwAAAAABJRU5ErkJggg=="
        />
        {children}
      </div>
      <form className="flex flex-col gap-4" action={updateProfile}>
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
        <input
          type="file"
          className="w-full cursor-pointer"
          onChange={handleChangeAvatar}
          name="avatar"
        />
        <Button type="submit" text="Salvar" className="bg-[#42929c]" />
      </form>
    </>
  );
}
