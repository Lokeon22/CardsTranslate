"use client";
import { Cards } from "@/@types/Cards";
import { useState } from "react";

interface ExerciseClientProps {
  data?: Cards[];
}

export default function ExerciseClient({ data }: ExerciseClientProps) {
  const [indexActual, setIndexActual] = useState(0);

  const handleQuestion = () => setIndexActual((prev) => prev + 1);

  const actual = data && data[indexActual];

  return (
    <div>
      {actual && (
        <div key={actual.id}>
          <h2>Pergunta: {actual.english}</h2>
          <h2>
            Resposta: <input type="text" />
          </h2>
        </div>
      )}
      {data && indexActual < data.length - 1 ? (
        <button
          className="bg-blue-400 mt-3 px-4 w-max py-1.5 rounded text-gray-100"
          onClick={handleQuestion}
        >
          Proxima pergunta
        </button>
      ) : (
        <span>Final das perguntas</span>
      )}
    </div>
  );
}
