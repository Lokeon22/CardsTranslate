export type UserLogin = {
  user: {
    id: number;
    name: string;
    email: string;
    password: string;
    avatar: string | null;
    background: string | null;
    created_at: Date;
  };
  token: string;
};

export type UserProps = {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar: string | null;
  background: string | null;
  created_at: Date;
};
