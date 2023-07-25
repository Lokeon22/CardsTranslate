import { CardFlip } from "@/components/CardFlip";

export default function MyCards() {
  return (
    <section className="flex flex-col items-center w-full h-screen bg-black text-white">
      <h2 className="text-3xl my-20">Cards page</h2>
      <CardFlip />
    </section>
  );
}
