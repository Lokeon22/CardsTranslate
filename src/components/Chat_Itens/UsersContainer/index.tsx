"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import avatardefault from "@/assets/icons/avatardefault.png";

import { Chats } from "@/@types/Chat";
import { UserProps } from "@/@types/User";

interface UsersCProps {
  data: Chats;
  online: boolean;
  currentUser: number;
}

export function UsersContainer({ data, online, currentUser }: UsersCProps) {
  const [userData, setUserData] = useState<UserProps>();

  async function getUserData() {
    const id = data.receive_id !== currentUser ? data.receive_id : data.sender_id;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`).then((res) =>
        res.json()
      );

      setUserData(res);
    } catch (error) {
      return console.log(error);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <Image
        width={60}
        height={60}
        className="rounded-full"
        src={
          userData?.avatar
            ? `${process.env.NEXT_PUBLIC_API_URL}/files/${userData.avatar}`
            : avatardefault
        }
        alt="user avatar"
        priority
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvmhRPQAGTwJs6OQmwAAAAABJRU5ErkJggg=="
      />
      <div className="relative">
        <span
          className={`w-3 h-3 lg:w-3.5 lg:h-3.5 rounded-full  absolute -left-[17px] -top-5 lg:-left-[20px] lg:-top-1 bg-green-500
          ${online ? "inline-block" : "hidden"}
        `}
        />
        <p className="hidden lg:block font-medium text-sm xl:text-base">{userData?.name}</p>
        <span className="hidden lg:block text-xs xl:text-sm">{`${
          online ? "Online" : "Offline"
        }`}</span>
      </div>
    </>
  );
}
