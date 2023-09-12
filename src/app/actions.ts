"use server";
import { cookies } from "next/dist/client/components/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Cards } from "@/@types/Cards";
import { UserProps } from "@/@types/User";

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

export async function deleteCard({ id }: { id: number[] }) {
  "use server";
  const token = cookies().get("lk_token");

  const cards_ids = JSON.stringify(id);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/card/remove?id=${cards_ids}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + `${token?.value}`,
    },
  });

  res.ok ? revalidatePath("/mycards") : console.log("ERROR to delete");
}

export async function updateProfile(data: FormData) {
  "use server";
  const token = cookies().get("lk_token");

  const user: UserProps = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/details`, {
    headers: {
      Authorization: "Bearer " + token?.value,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  const name = data.get("name");
  const email = data.get("email");
  const avatarFile: any = data.get("avatar"); // Blob - Image wiht Size
  const backgroundFile: any = data.get("background"); // Blob - Image with Size

  if (name === "" && email === "" && avatarFile.size === 0 && backgroundFile.size === 0) return;

  try {
    if (avatarFile.size !== 0 && backgroundFile.size !== 0) {
      const formDataAvatar = new FormData();
      const formDataBg = new FormData();

      formDataAvatar.append("avatar", avatarFile);
      formDataBg.append("background", backgroundFile);

      const res_avatar = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/avatar`, {
        method: "PATCH",
        body: formDataAvatar,
        headers: {
          Authorization: "Bearer " + token?.value,
        },
      }).then((res) => res.json());

      const res_bg = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/background`, {
        method: "PATCH",
        body: formDataBg,
        headers: {
          Authorization: "Bearer " + token?.value,
        },
      }).then((res) => res.json());

      revalidatePath("/profile");
      revalidatePath("/chat");

      return console.log(res_avatar.message + " " + res_bg.message);
    } else if (avatarFile !== null && avatarFile.size !== 0) {
      const formData = new FormData();
      formData.append("avatar", avatarFile);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/avatar`, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: "Bearer " + token?.value,
        },
      });

      const data = await res.json();

      if (res.ok) {
        revalidatePath("/profile");
        revalidatePath("/chat");
      }

      return console.log(data.message);
    } else if (backgroundFile !== null && backgroundFile.size !== 0) {
      const formData = new FormData();
      formData.append("background", backgroundFile);

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/background`, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: "Bearer " + token?.value,
        },
      });

      const data = await res.json();

      if (res.ok) {
        revalidatePath("/profile");
        revalidatePath("/chat");
      }

      return console.log(data.message);
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/update`, {
      method: "PUT",
      body: JSON.stringify({
        name: name === "" ? user.name : name,
        email: email === "" ? user.email : email,
      }),
      headers: {
        Authorization: "Bearer " + token?.value,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      revalidatePath("/profile");
      revalidatePath("/chat");
    }

    return console.log(res);
  } catch (error) {
    return console.log(error);
  }
}
