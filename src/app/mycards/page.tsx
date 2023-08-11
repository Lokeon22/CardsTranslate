import { CardFlip } from "@/components/CardFlip";
import { getUserToken } from "@/functions/getCookie";

import Link from "next/link";
import { Cards } from "@/@types/Cards";

async function getAllCards(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allcards`, {
    next: { revalidate: 60 * 60 * 24 },
    headers: {
      Authorization: "Bearer " + `${token}`,
    },
  });

  const data: Cards[] = await res.json();

  return { data };
}

export default async function MyCards() {
  const token = getUserToken();
  const { data } = await getAllCards(token as string);

  return (
    <section className="w-full h-full bg-gray-200 animate-changeOpDire">
      <div className="max-w-7xl flex items-center gap-5 mx-auto my-0 px-2 sm:px-4 mt-5">
        <h2 className="text-xl font-semibold uppercase">Meus cards</h2>
        <Link
          className="border-2 border-[#42929c] px-4 py-1.5 w-max uppercase text-sm hover:bg-[#43818A] hover:duration-500 hover:text-blue-100"
          href={"/"}
        >
          Criar card
        </Link>
      </div>

      <div className="max-w-7xl h-ful grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mx-auto my-4 px-2 sm:px-4">
        {data.length > 0 ? (
          data.map((dt, index) => {
            return (
              <CardFlip
                key={index}
                allCards={data}
                id={dt.id}
                english={dt.english}
                portuguese={dt.portuguese}
              />
            );
          })
        ) : (
          <h2>Nenhum card encontrado</h2>
        )}
      </div>
    </section>
  );
}
