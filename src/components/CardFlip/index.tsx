"use client";
import { useState } from "react";
import { BsFillPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import { updateCard } from "@/app/actions";

import { PlayerButton } from "../PlayerButton";
import { InputUpdate } from "./InputUpdate";
import { Cards } from "@/@types/Cards";

interface ICardFlip {
  id: number;
  english: string;
  portuguese: string;
  allCards: Cards[];
}

export function CardFlip({ id, english, portuguese, allCards }: ICardFlip) {
  const [flip, setFlip] = useState<boolean>(false);
  const [play, setPlay] = useState<boolean>(false);

  const [front, setFront] = useState<boolean>(false);
  const [back, setBack] = useState<boolean>(false);

  const [input, setInput] = useState({
    front_card: "",
    back_card: "",
  });

  function handleFlip() {
    if (window.speechSynthesis.speaking) return;
    setFlip(!flip);
  }

  function playPhrase() {
    const audio = new SpeechSynthesisUtterance(english);
    if (!play && !window.speechSynthesis.speaking) {
      audio.lang = "en-US";
      window.speechSynthesis.speak(audio);
      setPlay(!play);
      audio.onend = () => {
        return setPlay(false);
      };
    }
  }

  function stopPhrase() {
    window.speechSynthesis.cancel();
    setPlay(!play);
  }

  return (
    <>
      <div className="w-full h-48 perspective">
        <div
          className="w-full h-full relative preserve-3d"
          style={{ transform: flip ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          <div
            className="absolute w-full h-full p-1 sm:p-2.5 text-center sm:text-justify backface-hidden overflow-hidden rounded-xl flex flex-col items-center justify-center bg-[#448691]"
            id="card_front"
          >
            <InputUpdate state={front} setState={setFront} text={english} id={id}>
              <input
                onChange={({ target }) =>
                  setInput((prev) => ({ ...prev, front_card: target.value }))
                }
                className="px-2 py-1 rounded outline-none"
                type="text"
              />
              <button
                onClick={() => {
                  updateCard({
                    en_front: input.front_card,
                    id,
                    allCards,
                    pt_back: input.back_card,
                  });
                  setFront(false);
                }}
                className="px-1 bg-gray-300 rounded text-slate-700"
                type="submit"
              >
                salvar
              </button>
            </InputUpdate>

            <div className="flex gap-3 items-center justify-center mt-2 text-white">
              {play ? (
                <PlayerButton
                  onClick={stopPhrase}
                  text=""
                  icon={<BsPauseCircleFill className="w-6 h-6" />}
                />
              ) : (
                <PlayerButton
                  onClick={playPhrase}
                  text=""
                  icon={<BsFillPlayCircleFill className="w-6 h-6" />}
                />
              )}
              <span
                onClick={handleFlip}
                className="text-gray-100 cursor-pointer hover:brightness-90 hover:duration-200"
              >
                ver tradução
              </span>
            </div>
          </div>
          <div
            className="w-full h-full backface-hidden overflow-hidden rounded-xl my-rotate-y-180 bg-[#5ea0aa] px-2.5 sm:px-0"
            id="card_back"
          >
            <div
              onClick={(e) => e.currentTarget === e.target && handleFlip()}
              className="w-full h-full p-4 sm:p-2.5 flex flex-col justify-center cursor-pointer"
              id="card_content"
            >
              <InputUpdate state={back} setState={setBack} text={portuguese} id={id}>
                <input
                  onChange={({ target }) =>
                    setInput((prev) => ({ ...prev, back_card: target.value }))
                  }
                  className="px-2 py-1 rounded outline-none"
                  type="text"
                />
                <button
                  onClick={() => {
                    updateCard({
                      pt_back: input.back_card,
                      id,
                      allCards,
                      en_front: input.front_card,
                    });
                    setBack(false);
                  }}
                  className="px-1 bg-gray-300 rounded text-slate-700"
                  type="submit"
                >
                  salvar
                </button>
              </InputUpdate>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
