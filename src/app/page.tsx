import Link from "next/link";
import { UserAudio } from "@/components/UserAudio";

export default function Home() {
  return (
    <main className="w-full h-full max-w-7xl mx-auto my-0 px-2 sm:px-4 animate-changeOpDire max-[331px]:mb-10">
      <h2 className="text-lg sm:text-2xl mt-5 sm:mt-8 mb-2 font-semibold">
        Somos uma plataforma feita para você. Aprenda utilizando o método de flash cards e áudio.
      </h2>
      <h2 className="text-base sm:text-lg">
        Você também pode praticar se conectando com outros usuários através do nosso chat{" "}
        <Link className="text-blue-600 hover:brightness-90 hover:duration-200" href={"/"}>
          clicando aqui
        </Link>
      </h2>
      <h3 className="text-xl sm:text-3xl font-medium mt-4 sm:mt-6 mb-2">Crie seu flash card</h3>
      <UserAudio />
    </main>
  );
}
