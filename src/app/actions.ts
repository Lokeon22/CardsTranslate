"use server";
import { cookies } from "next/dist/client/components/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Cards } from "@/@types/Cards";

interface updateCardProps {
  id: number;
  en_front: string;
  pt_back: string;
  allCards: Cards[];
}

export async function create(data: FormData) {
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

export async function userLogout() {
  revalidatePath("/mycards");
}

export async function updateCard({ allCards, id, en_front, pt_back }: updateCardProps) {
  "use server";
  const token = cookies().get("lk_token");

  const card_filtered = allCards.find((card) => card.id === id) as Cards;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/card/update?id=${id}`, {
    method: "PUT",
    body: JSON.stringify({
      english: en_front === "" ? card_filtered.english : en_front,
      portuguese: pt_back === "" ? card_filtered.portuguese : pt_back,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + `${token?.value}`,
    },
  });

  res.ok ? revalidatePath("/mycards") : console.log("ERROR to update");
}
