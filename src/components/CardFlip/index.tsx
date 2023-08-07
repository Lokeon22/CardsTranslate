"use client";
import { useState } from "react";
import { BsFillPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";
import { PlayerButton } from "../PlayerButton";

export function CardFlip({ english, portuguese }: { english: string; portuguese: string }) {
  const [flip, setFlip] = useState<boolean>(false);
  const [play, setPlay] = useState<boolean>(false);

  function handleFlip() {
    if (window.speechSynthesis.speaking) {
      return;
    }
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
            <h2 className="text-base text-center overflow-x-auto text-white scroll-smooth scrollbar-thin scrollbar-thumb-[#cedae4] scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
              {english}
            </h2>
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
              onClick={handleFlip}
              className="w-full h-full p-0 sm:p-2.5 flex flex-col justify-center cursor-pointer"
              id="card_content"
            >
              <h2 className="px-1 text-base text-center text-white overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-[#cedae4] scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                {portuguese}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
