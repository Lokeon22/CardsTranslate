export type Chats = {
  id: number;
  sender_id: number;
  receive_id: number;
  created_at: Date;
};

export type OnlineUsersT = {
  socketId: string;
  userId: number;
};
