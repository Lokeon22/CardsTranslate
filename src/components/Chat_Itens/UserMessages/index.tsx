"use client";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/userContext";

import Image from "next/image";
import avatardefault from "@/assets/icons/avatardefault.png";

import { UserProps } from "@/@types/User";
import { Chats } from "@/@types/Chat";

interface UserMessagesProps {
  chat?: number;
  currentUser?: number;
  token: string;
  setSendMessage: React.Dispatch<any>;
  receiveMessage: any;
}

interface MessagesProps {
  chatId: number;
  message: string;
  sender_id: number;
  receiveUser: number;
}

export function UserMessages({
  chat,
  currentUser,
  token,
  setSendMessage,
  receiveMessage,
}: UserMessagesProps) {
  const { user } = useAuth();

  const [userData, setUserData] = useState<UserProps>();
  const [messages, setMessages] = useState<MessagesProps[]>([]);
  const [newMessage, setNewMessage] = useState("");

  //key utilizada para atualizar as novas mensagens do banco ao trocar de usuario ou mandar mensagens
  const [key, setKey] = useState(false);

  const scroll = useRef<HTMLDivElement>(null);

  async function getUserData() {
    let data: Chats = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/find/${chat}`).then(
      (res) => res.json()
    );

    let profile_id = currentUser === data.sender_id ? data.receive_id : data.sender_id;

    try {
      if (profile_id) {
        const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${profile_id}`).then(
          (res) => res.json()
        );
        setUserData(data);
      }
    } catch (error) {
      return console.log("Error on fetch data");
    }
  }

  //fetching data for messages
  async function getMessages() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/message/${chat}`).then((res) =>
        res.json()
      );

      setMessages(res);
    } catch (error) {
      return console.log("Error on get_messages");
    }
  }

  const handleChange = (text: string) => setNewMessage(text);

  async function handleSendMessage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const message = {
      sender_id: currentUser,
      message: newMessage,
      chatId: chat,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/message`, {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      if (res.ok) {
        setNewMessage("");
        const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/message/${chat}`).then((res) =>
          res.json()
        );
        setMessages([...messages, data]);
        setKey(!key);
      }
    } catch (error) {
      return console.log("Error to send_message");
    }

    const chat_r: Chats = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/find/${chat}`).then(
      (res) => res.json()
    );

    //send message to socket.io server erro no receive
    setSendMessage({
      ...message,
      receiveUser: chat_r.receive_id !== user?.id ? chat_r.receive_id : chat_r.sender_id,
    });
  }

  useEffect(() => {
    if (chat !== undefined) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    if (chat !== undefined) {
      getMessages();
    }
  }, [chat, key]);

  useEffect(() => {
    if (receiveMessage !== null && receiveMessage.chatId === chat) {
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage]);

  //scroll to recent messages
  useEffect(() => {
    if (messages) scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {chat ? (
        <>
          <div
            className="p-1.5 flex items-center gap-2 cursor-pointer hover:bg-gray-500 hover:duration-200 hover:rounded-xl"
            id="image_container"
          >
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
            </div>
          </div>
          <div className="border-t-[1.5px] border-t-gray-300 mt-2" id="border"></div>
          <div
            className="flex flex-col gap-2 my-3 sm:my-4 max-h-[450px] sm:max-h-[600px] max-[331px]:max-h-[400px] overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-[#cedae4] scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
            id="mensagens"
          >
            {messages.map((message, i) => {
              return (
                <p
                  key={i}
                  className={`max-w-[215px] sm:max-w-sm text-sm sm:text-base px-2 sm:px-3 py-2 rounded-r-xl rounded-tl-xl text-gray-200
                ${
                  message.sender_id === currentUser
                    ? "bg-blue-400 self-end mr-0.5"
                    : "bg-orange-400 self-start"
                } `}
                >
                  {message.message}
                </p>
              );
            })}
            <div ref={scroll} />
          </div>

          <footer className="w-full flex gap-1 mt-auto" id="send_message">
            <input
              className="w-full outline-none p-2 rounded-lg"
              type="text"
              placeholder="Type a message"
              value={newMessage}
              onChange={({ target }) => handleChange(target.value)}
            />
            <button
              onClick={(e) => handleSendMessage(e)}
              className="px-3 sm:px-6 bg-gray-200 rounded hover:brightness-90 hover:duration-200"
            >
              &#9658;
            </button>
          </footer>
        </>
      ) : (
        <>
          <h2>Inicie uma conversa</h2>
        </>
      )}
    </>
  );
}
