"use client";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/userContext";
import Link from "next/link";

import { createPrivateChat } from "@/functions/privateChat";

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
  setCurrentChat: React.Dispatch<React.SetStateAction<number | undefined>>;
  setUpdateChat: React.Dispatch<React.SetStateAction<boolean>>;
  updateChat: boolean;
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
  setCurrentChat,
  setUpdateChat,
  updateChat,
}: UserMessagesProps) {
  const { user } = useAuth();

  const [userData, setUserData] = useState<UserProps>();
  const [messages, setMessages] = useState<MessagesProps[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const [users, setUsers] = useState<UserProps[]>();
  const [loading, setLoading] = useState<boolean>(false);

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

  //get all_users from chat_app
  const getAllUsers = async () => {
    setLoading(true);
    try {
      const user_chats: Chats[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/user`, {
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }).then((res) => res.json());

      const all_usuarios: UserProps[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allusers`)
        .then((res) => res.json())
        .then((data: UserProps[]) => data.filter((dt) => dt.id !== user?.id));

      // filtrando todos os usuarios no qual o usuario logado nunca conversou
      const ids_chats: number[] = user_chats.reduce(
        (ids, chat) => ids.concat(chat.receive_id as never, chat.sender_id as never),
        []
      );
      const filtered = all_usuarios.filter((usuario) => !ids_chats.includes(usuario.id as never));

      setLoading(false);
      setUsers(filtered);
    } catch (error) {
      return console.log("Error on fetch");
    }
  };

  useEffect(() => {
    if (chat !== undefined) {
      getUserData();
    }
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
          <Link
            className="flex items-center gap-2 cursor-pointer hover:duration-200 hover:rounded-xl hover:brightness-90 w-max"
            href={`/profile/user/${userData?.id}`}
            id="image_container"
          >
            <Image
              width={60}
              height={60}
              className="rounded-full w-12 h-12 sm:w-16 sm:h-16"
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
            <div className="flex flex-col leading-3">
              <p className="font-medium">{userData?.name}</p>
            </div>
          </Link>
          <div className="border-t-[1.5px] border-t-gray-300 mt-2" id="border"></div>
          <div
            className="flex flex-col gap-2 my-3 sm:my-4 max-h-[450px] sm:max-h-[600px] max-[331px]:max-h-[400px] overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-[#cedae4] scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
            id="mensagens"
          >
            {messages.map((message, i) => {
              return (
                <p
                  key={i}
                  className={`max-w-[215px] sm:max-w-sm text-sm sm:text-base px-1.5 sm:px-3 py-2 text-gray-200
                ${
                  message.sender_id === currentUser
                    ? "bg-blue-400 self-end mr-0.5 rounded-l-xl rounded-tr-xl"
                    : "bg-orange-400 self-start rounded-r-xl rounded-tl-xl"
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
              className="w-full outline-none py-2 px-3 rounded-2xl border-[#43818A] border"
              type="text"
              placeholder="Type a message"
              value={newMessage}
              onChange={({ target }) => handleChange(target.value)}
            />
            <button
              onClick={(e) => handleSendMessage(e)}
              className="px-3 sm:px-6 bg-gray-300 rounded hover:brightness-90 hover:duration-200"
            >
              &#9658;
            </button>
          </footer>
        </>
      ) : (
        <>
          <h2 className="text-xl font-medium">Inicie uma conversa</h2>
          <span className="my-2">Não conhece ninguem? Encontre novos usuarios agora!</span>
          <button
            onClick={getAllUsers}
            className="bg-blue-600 text-white px-2 py-1 rounded w-max hover:duration-200 hover:brightness-90"
            type="button"
          >
            buscar
          </button>
          {loading && <span>Buscando...</span>}
          {users && <span className="font-medium text-2xl my-2">Usuarios</span>}
          <div className="w-max px-2 sm:px-0 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-[#cedae4] scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            {users &&
              user &&
              users.map((data) => {
                return (
                  <div className="flex items-center gap-1.5" key={data.id}>
                    <Link
                      className="w-max hover:brightness-90 hover:duration-200"
                      href={`/profile/user/${data.id}`}
                    >
                      <Image
                        width={60}
                        height={60}
                        className="rounded-full"
                        src={
                          data.avatar
                            ? `${process.env.NEXT_PUBLIC_API_URL}/files/${data.avatar}`
                            : avatardefault
                        }
                        alt="user avatar"
                        priority
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvmhRPQAGTwJs6OQmwAAAAABJRU5ErkJggg=="
                      />
                    </Link>
                    <div className="flex flex-col gap-0.5">
                      <p>{data.name}</p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          createPrivateChat({
                            sender_id: user.id,
                            receive_id: data.id,
                            token,
                            setCurrentChat,
                            setUpdateChat,
                            updateChat,
                          });
                        }}
                        className="px-2 py-0.5 bg-blue-400 rounded text-gray-100 hover:brightness-90 hover:duration-200"
                        type="button"
                      >
                        conversar
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </>
  );
}
