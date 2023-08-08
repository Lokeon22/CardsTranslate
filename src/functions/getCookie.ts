import { cookies } from "next/headers";

export function getUserToken() {
  const token = cookies().get("lk_token");

  if (!token?.value) return console.log("error");

  return token.value;
}
