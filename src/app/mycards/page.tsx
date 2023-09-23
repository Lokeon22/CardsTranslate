import { CardFlip } from "@/components/CardFlip";
import { getUserToken } from "@/functions/getCookie";

import Link from "next/link";
import { Cards } from "@/@types/Cards";
import { ButtonDelete } from "@/components/ButtonDelete";

async function getAllCards({ token, page, limit }: { token: string; page: number; limit: number }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/allcards?page=${page}&limit=${limit}`,
    {
      next: { revalidate: 60 * 60 * 24 },
      headers: {
        Authorization: "Bearer " + `${token}`,
      },
    }
  );

  const data: Cards[] = await res.json();

  return { data };
}

export default async function MyCards({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit = typeof searchParams.limit === "string" ? Number(searchParams.limit) : 8;

  const token = getUserToken();
  const { data } = await getAllCards({ token: token as string, page, limit });

  return (
    <section className="w-full h-full bg-gray-200 animate-changeOpDire">
      <div className="max-w-7xl flex sm:flex-row flex-col items-start sm:items-center gap-3 sm:gap-5 mx-auto my-0 px-2 sm:px-4 mt-5">
        <div className="flex items-center gap-5">
          <h2 className="text-xl font-semibold uppercase">Meus cards</h2>
          <Link
            className="border-2 border-[#42929c] rounded px-4 py-1.5 w-max uppercase text-sm hover:bg-[#43818A] hover:duration-500 hover:text-blue-100"
            href={"/"}
          >
            Criar card
          </Link>
        </div>

        <nav
          style={{ display: data.length > 7 || page > 1 ? "flex" : "none" }}
          className="items-center gap-3 mt-2 sm:mt-0"
        >
          <Link
            className="px-4 py-1.5 w-max text-sm bg-gray-400 text-gray-200 rounded cursor-pointer"
            style={{ pointerEvents: page <= 1 ? "none" : "auto", opacity: page <= 1 ? 0.7 : 1 }}
            href={`/mycards?page=${page > 1 ? page - 1 : 1}`}
          >
            Voltar
          </Link>
          <Link
            className="px-4 py-1.5 w-max text-sm bg-gray-500 text-gray-200 rounded cursor-pointer hover:brightness-90 hover:duration-200"
            href={`/mycards?page=${data.length > 7 ? page + 1 : page}`}
          >
            Proximo
          </Link>
        </nav>

        {data.length > 5 && (
          <Link
            href={"/mycards/exercise"}
            className="ml-auto rounded border-2 border-[#42929c] px-4 py-1.5 w-max uppercase text-sm hover:bg-[#43818A] hover:duration-500 hover:text-blue-100"
          >
            Revisão
          </Link>
        )}

        {data.length > 0 && <ButtonDelete />}
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
