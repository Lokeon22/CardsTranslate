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

  const [receiveUser, setReceiveUser] = useState<number>();

  const [onlineUsers, setOnlineUsers] = useState<OnlineUsersT[]>([]);
  const [sendMessage, setSendMessage] = useState<any | null>(null);
  const [receiveMessage, setReceiveMessage] = useState<any | null>(null);

  const socket = connect("http://localhost:8080");

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
    if (sendMessage !== null) {
      socket.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  //receive message from socket_server
  useEffect(() => {
    socket.on("receive-message", (data) => {
      setReceiveMessage(data);
    });
  }, []);

  async function getChats() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data: Chats[] = await res.json();
    setChats(data);
  }

  useEffect(() => {
    getChats();
    console.log("Oi");
  }, [user, onlineUsers]);

  function checkOnlineStatus(chat: Chats) {
    const chatMember = chat.receive_id !== user?.id ? chat.receive_id : chat.sender_id;
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  }

  return (
    <main className="w-full max-h-[600px] xl:max-h-[700px] h-screen max-w-7xl mx-auto my-2 px-2 sm:px-4 animate-changeOpDire max-[331px]:mb-10">
      <section className="w-full h-full grid grid-cols-5 gap-5" id="all_chat_container">
        <div
          className="bg-blue-500 text-gray-200 p-3 h-full col-span-1 rounded-2xl"
          id="all_users_container"
        >
          <h2 className="text-2xl font-medium mb-4">Chats</h2>
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
                    className="p-1.5 flex items-center gap-2 cursor-pointer hover:bg-gray-500 hover:duration-200 hover:rounded-xl"
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
          className="bg-gray-400 flex flex-col col-span-4 rounded-2xl p-3 max-h-[600px] xl:max-h-[700px] h-screen"
          id="real_chat"
        >
          <UserMessages
            chat={currentChat}
            currentUser={user?.id}
            token={token}
            setSendMessage={setSendMessage}
            receiveMessage={receiveMessage}
          />
        </div>
      </section>
    </main>
  );
}
