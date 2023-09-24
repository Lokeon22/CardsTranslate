"use client";
import { Cards } from "@/@types/Cards";
import { useState } from "react";

interface ExerciseClientProps {
  data?: Cards[];
}

export default function ExerciseClient({ data }: ExerciseClientProps) {
  const [indexActual, setIndexActual] = useState(0);
  const [answers, setAnswers] = useState<string>("");

  const [allAnswers, setAllAnswers] = useState<string[]>([]);
  const [amountCorrect, setAmountCorrect] = useState<number>(0);

  const [show, setShow] = useState<boolean>(false); // key to show result

  function findSameStrings(array1: string[], array2: string[]) {
    let amount = 0;

    const array1Lower = array1.map((str) => str.toLowerCase());
    const array2Lower = array2.map((str) => str.toLowerCase());

    for (let i = 0; i < array1Lower.length; i++) {
      for (let j = 0; j < array2Lower.length; j++) {
        if (array1Lower[i] === array2Lower[j]) {
          amount++;
        }
      }
    }

    return amount;
  }

  const handleQuestion = () => {
    setAllAnswers([...allAnswers, answers]);
    if (answers.length > 0) setIndexActual((prev) => prev + 1);

    return;
  };

  const actual = data && data[indexActual];

  const showResult = () => {
    const portugueseArray = data?.map((dt) => dt.portuguese) as string[];

    const result = findSameStrings(portugueseArray, allAnswers);

    setAmountCorrect(result);

    return setShow(true);
  };

  return (
    <section>
      {actual && (
        <section className="flex flex-col items-start gap-4 mt-4" key={actual.id}>
          <p className="text-base sm:text-lg">
            <strong>Frase:</strong> {actual.english}
          </p>
          <p className="text-base sm:text-lg">
            <strong>Resposta:</strong>
            <input
              required
              onChange={({ target }) => setAnswers(target.value)}
              className="w-max border-0 px-2 py-0.5 outline-none rounded ml-2"
              name="user_response"
              type="text"
            />
          </p>
          {data && indexActual < data.length - 1 ? (
            <button
              type="button"
              className="bg-blue-400 mt-3 px-4 w-max py-1.5 rounded text-gray-100 hover:duration-200 hover:brightness-90"
              onClick={handleQuestion}
            >
              Proxima frase
            </button>
          ) : (
            <button
              type="button"
              onClick={handleQuestion}
              className="bg-blue-400 px-4 py-1.5 rounded text-gray-100 hover:duration-200 hover:brightness-90"
            >
              Enviar respostas
            </button>
          )}
        </section>
      )}
      {data && indexActual < data.length - 0 === false && (
        <div className="flex flex-col gap-3">
          <button
            className="bg-blue-400 w-48 px-4 py-1.5 rounded outline-none text-gray-100 hover:duration-200 hover:brightness-90"
            type="button"
            onClick={showResult}
          >
            Ver resultado
          </button>
        </div>
      )}
      {show && (
        <p className="mt-2">
          {amountCorrect > 0
            ? `Você acertou ${amountCorrect} perguntas!`
            : `Você errou todas as frases, estude mais!`}
        </p>
      )}
    </section>
  );
}
