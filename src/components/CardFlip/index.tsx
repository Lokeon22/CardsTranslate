"use client";
import { useState } from "react";

export function CardFlip() {
  const [flip, setFlip] = useState<boolean>(false);

  function handleFlip() {
    setFlip(!flip);
  }

  return (
    <>
      <div className="min-w-min sm:w-96 h-56 px-2 sm:px-0 perspective">
        <div
          className="w-full h-full relative preserve-3d"
          style={{ transform: flip ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          <div
            className="absolute w-full h-full p-1 sm:p-2.5 text-center sm:text-justify backface-hidden overflow-hidden rounded-xl flex flex-col items-center justify-center bg-blue-700"
            id="card_front"
          >
            <h2 className="text-lg text-center overflow-x-auto">
              A little sympathy, I hope you can show me
            </h2>
            <span
              onClick={handleFlip}
              className="text-gray-200 mt-2 cursor-pointer hover:brightness-90 hover:duration-200"
            >
              ver tradução
            </span>
          </div>
          <div
            className="w-full h-full backface-hidden overflow-hidden rounded-xl my-rotate-y-180 bg-blue-500 px-2.5 sm:px-0"
            id="card_back"
          >
            <div
              onClick={handleFlip}
              className="w-full h-full p-0 sm:p-2.5 flex flex-col justify-center cursor-pointer overflow-x-auto"
              id="card_content"
            >
              <h2 className="text-lg text-center">
                Um pouco de simpatia, espero que você possa me mostrar
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
