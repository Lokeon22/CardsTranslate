"use server";
import { cookies } from "next/dist/client/components/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function create(data: FormData) {
  "use server";
  const token = cookies().get("lk_token");
  //get first phrase value from cookie
  const en = cookies().get("en");
  if (!en?.value) return;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/card/create`, {
    method: "POST",
    body: JSON.stringify({
      english: en.value,
      portuguese: data.get("second"),
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + `${token?.value}`,
    },
  });

  if (!res.ok) return console.log("error");

  if (res.status === 200) {
    revalidatePath("/");
    revalidatePath("/mycards");
    redirect("/mycards");
  }
}

export { create };
