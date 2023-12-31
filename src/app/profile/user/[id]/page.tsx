import Link from "next/link";

import { UserProps } from "@/@types/User";

import Image from "next/image";
import avatardefault from "@/assets/icons/avatardefault.png";
import bgdevil from "@/assets/icons/devil2.jpg";

const getUserDetails = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
      cache: "no-cache",
    });

    const user: UserProps = await res.json();

    return user;
  } catch (error) {
    return console.log(error);
  }
};

export default async function UserProfile({ params }: { params: { id: string } }) {
  const user = await getUserDetails(params.id);

  const useravatar = user?.avatar
    ? `${process.env.NEXT_PUBLIC_API_URL}/files/${user.avatar}`
    : avatardefault;

  return (
    <main className="w-full h-full max-w-7xl mx-auto my-5 px-1 sm:px-2 lg:px-4 animate-changeOpDire max-[331px]:mb-10">
      <div
        className="flex justify-center sm:justify-start items-center gap-2 sm:gap-2.5 flex-wrap relative
        w-full bg-gradient-to-r from-pink-600 via-red-600 to-purple-600 rounded-xl"
      >
        {user ? (
          <>
            <Image
              className="w-full h-full absolute rounded-xl p-[3px]"
              style={{ objectFit: "cover", objectPosition: "center" }}
              src={
                user.background
                  ? `${process.env.NEXT_PUBLIC_API_URL}/files/${user.background}`
                  : bgdevil
              }
              alt="user_background"
              priority
              fill
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvmhRPQAGTwJs6OQmwAAAAABJRU5ErkJggg=="
            />
            <section className="relative flex top-20 sm:top-0 items-center gap-3 p-3 mx-[3px] my-[3px] bg-transparent sm:bg-black bg-opacity-50 rounded-l-xl">
              <Image
                width={120}
                height={120}
                className="w-32 sm:w-40 h-32 sm:h-40 rounded-full border-2"
                src={useravatar}
                alt="user avatar"
                priority
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNcvmhRPQAGTwJs6OQmwAAAAABJRU5ErkJggg=="
              />
              <div className="flex flex-col gap-1 text-black sm:text-gray-100 relative top-11 bg-gray-100 p-1 rounded sm:top-0 sm:bg-transparent">
                <h2 className="text-lg font-medium mb-2">{user.name}</h2>
                <p className="text-sm sm:text-base">{user.email}</p>
                <p className="text-xs sm:text-sm">
                  <span>Entrou em:</span>{" "}
                  {Intl.DateTimeFormat("pt-BR").format(new Date(user.created_at as Date))}
                </p>
              </div>
            </section>
          </>
        ) : (
          <h2 className="font-medium text-lg">
            Usuário não encontrado...{" "}
            <Link
              className="text-[#42929c] hover:brightness-90 hover:duration-200 uppercase"
              href={"/"}
            >
              Voltar
            </Link>
          </h2>
        )}
      </div>
    </main>
  );
}
