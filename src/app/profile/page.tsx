import { UserProps } from "@/@types/User";
import { cookies } from "next/headers";
import { ProfileForm } from "@/components/ProfileForm";

const userDetail = async (token: string) => {
  if (!token) return;
  const data: UserProps = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/details`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  }).then((res) => res.json());

  return data;
};

export default async function Profile() {
  const token = cookies().get("lk_token");
  const user = await userDetail(token?.value as string);

  return (
    <main className="w-full h-full max-w-7xl mx-auto my-0 px-2 sm:px-4 animate-changeOpDire max-[331px]:mb-10">
      <h2 className="text-2xl font-medium my-5">Suas informações</h2>

      <section className="flex flex-col justify-center items-center gap-4">
        {user && (
          <ProfileForm avatar={user.avatar}>
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-medium mb-1">{user?.name}</h2>
              <p>{user?.email}</p>
              <span className="text-sm">
                {Intl.DateTimeFormat("pt-BR").format(new Date(user?.created_at as Date))}
              </span>
            </div>
          </ProfileForm>
        )}
      </section>
    </main>
  );
}
