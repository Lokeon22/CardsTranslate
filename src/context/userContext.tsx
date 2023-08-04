"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { setCookie, parseCookies } from "nookies";

import { UserLogin, UserProps } from "@/@types/User";

interface UserContextProps {
  user?: UserProps;
  setUser: React.Dispatch<React.SetStateAction<UserProps | undefined>>;
  handleLogin: (data: FormData) => void;
}

const UserContext = createContext({} as UserContextProps);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProps>();

  useEffect(() => {
    const { lk_token: token, lk_user: user } = parseCookies();

    if (token) {
      const userConvert: UserProps = JSON.parse(user);
      setUser(userConvert);
    }
  }, []);

  async function handleLogin(data: FormData) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { user, token }: UserLogin = await res.json();

    if (res.status === 400) return alert("Email e/ou senha incorretos");

    if (res.ok) {
      setCookie(null, "lk_token", token, {
        maxAge: 60 * 60 * 6,
        path: "/",
      });

      setCookie(null, "lk_user", JSON.stringify(user), {
        maxAge: 60 * 60 * 6,
        path: "/",
      });

      setUser(user);

      return redirect("/");
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, handleLogin }}>{children}</UserContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(UserContext);
  return context;
}
