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
        src={avatardefault}
        alt="avatar_default"
        priority
      />
      <div className="flex flex-col leading-3">
        <p className="font-medium">{userData?.name}</p>
        <span className="text-sm">{online ? "Online" : "Offline"}</span>
      </div>
    </>
  );
}
