import { UserAudio } from "@/components/UserAudio";

export default function Home() {
  return (
    <main className="w-full h-full max-w-7xl mx-auto my-0 px-2 sm:px-4">
      <h3 className="text-xl sm:text-3xl font-medium my-5 sm:my-8">
        Aqui você pode adicionar seus cards
      </h3>
      <UserAudio />
    </main>
  );
}
