"use client";
import { useState } from "react";
import { parseCookies } from "nookies";
import { IoChevronBackSharp } from "react-icons/io5";
import Link from "next/link";

import { Cards } from "@/@types/Cards";
import ExerciseClient from "@/components/ExerciseClient";

export default async function Exercises() {
  const [data, setData] = useState<Cards[]>();

  const [step, setStep] = useState<number[]>();

  async function getExercise() {
    const { lk_token: token } = parseCookies();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/allcards`, {
      next: { revalidate: 60 * 60 * 24 },
      headers: {
        Authorization: "Bearer " + `${token}`,
      },
    });

    const data: Cards[] = await res.json();
    setData(data);

    var result: number[] = [];

    for (var i = 0; i <= data.length; i++) {
      result.push(i);
    }

    //adicionando o número total de steps das perguntas do card do usuario
    setStep(result);

    return console.log("executei");
  }

  return (
    <section className="w-full h-full bg-gray-200 animate-changeOpDire">
      <div className="max-w-7xl flex flex-col items-start gap-3 sm:gap-5 mx-auto my-0 px-2 sm:px-4 mt-5">
        <div className="w-full flex justify-between gap-2 items-center">
          <h2 className="text-xl font-semibold">Exercícios</h2>
          <Link
            className="flex items-center gap-1 hover:brightness-90 hover:duration-200"
            href={"/mycards"}
          >
            <IoChevronBackSharp className="w-5 h-5" />
            Voltar
          </Link>
        </div>

        {!data && (
          <button
            onClick={getExercise}
            className="border-2 rounded border-[#42929c] px-4 py-1.5 w-max uppercase text-sm hover:bg-[#43818A] hover:duration-500 hover:text-blue-100"
          >
            Iniciar agora
          </button>
        )}

        {data && <ExerciseClient data={data} />}
      </div>
    </section>
  );
}
