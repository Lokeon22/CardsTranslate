"use client";
import { connect } from "socket.io-client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/userContext";
import { parseCookies } from "nookies";

import { UsersContainer } from "@/components/Chat_Itens/UsersContainer";
import { UserMessages } from "@/components/Chat_Itens/UserMessages";

import { Chats, OnlineUsersT } from "@/@types/Chat";

export default function Chat() {
  const { lk_token: token } = parseCookies();
  const { user } = useAuth();

  const [chats, setChats] = useState<Chats[]>([]);
  const [currentChat, setCurrentChat] = useState<number>();

  // just a key to reload a new chat on create
  const [updateChat, setUpdateChat] = useState<boolean>(false);

  const [receiveUser, setReceiveUser] = useState<number>();

  const [onlineUsers, setOnlineUsers] = useState<OnlineUsersT[]>([]);
  const [sendMessage, setSendMessage] = useState<any | null>(null);
  const [receiveMessage, setReceiveMessage] = useState<any | null>(null);

  const socket = connect("https://lkcards-api.onrender.com"); //connect to server

  useEffect(() => {
    if (user?.id) {
      socket.emit("new-user-add", user?.id);
      socket.on("get-users", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

  //send message to socket_server
  useEffect(() => {
    if (sendMessage !== null) socket.emit("send-message", sendMessage);
  }, [sendMessage]);

  //receive message from socket_server
  useEffect(() => {
    socket.on("receive-message", (data) => {
      setReceiveMessage(data);
    });
  }, []);

  async function getChats() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const data: Chats[] = await res.json();
      setChats(data);
    } catch (error) {
      return console.log("Error get chat");
    }
  }

  useEffect(() => {
    getChats();
  }, [user, onlineUsers, updateChat]);

  function checkOnlineStatus(chat: Chats) {
    const chatMember = chat.receive_id !== user?.id ? chat.receive_id : chat.sender_id;
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  }

  return (
    <main className="w-full max-h-[600px] xl:max-h-[700px] h-screen max-w-7xl mx-auto my-2 px-1 sm:px-4 animate-changeOpDire max-[331px]:mb-10">
      <section className="w-full h-full grid grid-cols-5 gap-1 sm:gap-5" id="all_chat_container">
        <div
          className="bg-[#43818A] text-gray-100 p-0.5 sm:p-1 xl:p-3 h-full col-span-1 rounded-lg sm:rounded-2xl"
          id="all_users_container"
        >
          <div className="flex flex-col gap-1 mb-2 p-0.5 sm:p-3">
            <h2 className="text-xl sm:text-3xl text-center sm:text-justify font-medium">Chats</h2>
            <button
              onClick={() => currentChat !== undefined && setCurrentChat(undefined)}
              type="button"
              className="bg-black px-2 py-0.5 rounded hover:duration-200 hover:brightness-90"
            >
              Voltar
            </button>
          </div>

          <div
            className="flex flex-col gap-4 max-h-[500px] sm:max-h-[600px] overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-[#cedae4] scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
            id="users"
          >
            {user &&
              chats.map((chat, index) => {
                return (
                  <div
                    onClick={() => {
                      setCurrentChat(chat.id);
                      setReceiveUser(chat.receive_id);
                    }}
                    key={index}
                    className="p-1.5 flex justify-center lg:justify-normal items-center gap-2 cursor-pointer hover:bg-gray-300 hover:bg-opacity-40 hover:duration-200 hover:rounded-xl"
                  >
                    <UsersContainer
                      data={chat}
                      online={checkOnlineStatus(chat)}
                      currentUser={user.id}
                    />
                  </div>
                );
              })}
          </div>
        </div>

        <div
          className="bg-gray-100 shadow-xl flex flex-col col-span-4 rounded-lg sm:rounded-2xl p-1 sm:p-1.5 max-h-[600px] xl:max-h-[700px] h-screen"
          id="real_chat"
        >
          <UserMessages
            chat={currentChat}
            setCurrentChat={setCurrentChat}
            currentUser={user?.id}
            token={token}
            setSendMessage={setSendMessage}
            receiveMessage={receiveMessage}
            setUpdateChat={setUpdateChat}
            updateChat={updateChat}
          />
        </div>
      </section>
    </main>
  );
}
