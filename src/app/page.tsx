import Link from "next/link";
import { create } from "./actions";
import { UserAudio } from "@/components/UserAudio";

export default function Home() {
  return (
    <main className="w-full h-full max-w-7xl mx-auto my-0 px-2 sm:px-4 animate-changeOpDire max-[331px]:mb-10">
      <h2 className="text-xl sm:text-2xl mt-5 sm:mt-8 font-medium">
        Somos uma plataforma feita para você. Aprenda utilizando o método de flash cards e áudio.
      </h2>
      <p className="text-base mt-0.5 font-normal">
        Você também pode praticar se conectando com outros usuários através do nosso chat{" "}
        <Link className="text-blue-500 hover:brightness-90 hover:duration-200" href={"/chat"}>
          clicando aqui.
        </Link>
      </p>
      <h3 className="text-xl sm:text-2xl font-medium mt-4 sm:mt-6 mb-2 relative before:content-[''] before:border-0 before:bg-[#3b727a] before:px-[3px] before:mr-2">
        Crie seu flash card
      </h3>
      <form action={create} className="w-full sm:max-w-xl sm:w-auto">
        <UserAudio />
      </form>
    </main>
  );
}
