"use client";
import { useState } from "react";
import { updateProfile } from "@/app/actions";

import Image, { StaticImageData } from "next/image";
import avatardefault from "@/assets/icons/avatardefault.png";

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
      <div className="flex items-center gap-2.5">
        <Image
          width={120}
          height={120}
          className="rounded-full"
          src={useravatar}
          alt="user avatar"
          priority
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvmhRPQAGTwJs6OQmwAAAAABJRU5ErkJggg=="
        />
        {children}
      </div>
      <form className="flex flex-col gap-2" action={updateProfile}>
        <input type="text" placeholder="Nome" name="name" />
        <input type="text" placeholder="Email" name="email" />
        <input type="file" onChange={handleChangeAvatar} name="avatar" />
        <Button type="submit" text="Salvar" className="bg-blue-500" />
      </form>
    </>
  );
}
