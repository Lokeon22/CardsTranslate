interface PrivateChatProps {
  sender_id: number;
  receive_id: number;
  token: string;
  setCurrentChat: React.Dispatch<React.SetStateAction<number | undefined>>;
  updateChat: boolean;
  setUpdateChat: React.Dispatch<React.SetStateAction<boolean>>;
}

export const createPrivateChat = async ({
  receive_id,
  sender_id,
  token,
  setCurrentChat,
  updateChat,
  setUpdateChat,
}: PrivateChatProps) => {
  try {
    const { chat_id }: { chat_id: number } = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/chat`,
      {
        method: "POST",
        body: JSON.stringify({
          sender_id,
          receive_id,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    ).then((res) => res.json());

    setCurrentChat(chat_id);
    setUpdateChat(!updateChat);
  } catch (error) {
    return console.log("Error on create new chat");
  }
};
