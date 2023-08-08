"use client";
import { useState, useRef } from "react";
import { setCookie } from "nookies";
import { useAuth } from "@/context/userContext";
import { TextArea } from "./Textarea";

import { BsFillPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";

import { PlayerButton } from "./PlayerButton";
import { Button } from "./Button";

export function UserAudio() {
  const { user } = useAuth();

  const [play, setPlay] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("en-US");
  const [screen, setScreen] = useState<"english" | "portuguese">("english");

  const textRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  function clearText() {
    const speaking = window.speechSynthesis.speaking;
    if (textRef.current.value !== "" && !speaking && screen === "english") {
      textRef.current.value = "";
    } else if (textRef.current.value !== "" && !speaking && screen === "portuguese") {
      textRef.current.value = "";
    } else {
      return;
    }
  }

  function handleAudio() {
    let audio = new SpeechSynthesisUtterance(textRef.current.value);
    if (!play && textRef.current.value !== "") {
      audio.lang = language;
      window.speechSynthesis.speak(audio);
      setPlay(!play);
      audio.onend = () => {
        return setPlay(false);
      };
    } else if (play) {
      window.speechSynthesis.cancel();
      setPlay(!play);
    }
  }

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setLanguage(value);
  }

  function handleScreen(step: "english" | "portuguese") {
    if (window.speechSynthesis.speaking) {
      return;
    }
    setScreen(step);
    setCookie(null, "en", textRef.current.value, {
      maxAge: 30,
      path: "/",
    });
  }

  return (
    <>
      {screen === "english" && (
        <TextArea placeholder="Digite a frase" textRef={textRef} name="first" />
      )}

      {screen === "portuguese" && (
        <div className="min-w-full sm:min-w-[400px]">
          <p className="w-max italic text-gray-800 leading-4 border-b-[1px] border-[#6cc8d6] rounded-sm mt-3 mb-2">
            oi
          </p>
          <TextArea placeholder="Agora digite a tradução" textRef={textRef} name="second" />
        </div>
      )}
      <section className="flex items-center justify-between gap-1 px-1 my-2">
        <div className="flex items-center justify-center gap-4">
          {play ? (
            <PlayerButton
              onClick={handleAudio}
              text="Stop"
              icon={<BsPauseCircleFill className="w-5 h-5" />}
            />
          ) : (
            <PlayerButton
              onClick={handleAudio}
              text="Play"
              icon={<BsFillPlayCircleFill className="w-5 h-5" />}
            />
          )}
          <select
            onChange={onChange}
            className="text-black outline-none rounded h-8 p-0.5 cursor-pointer"
          >
            <option value={"en-US"}>Inglês - EUA</option>
            <option value={"pt-BR"}>Português - Brasil</option>
          </select>
        </div>
        <Button
          text="Limpar"
          type="button"
          className="bg-red-700 w-auto sm:w-1/5 px-2 py-1"
          onClick={clearText}
        />
      </section>
      <nav className="w-full flex items-center justify-between gap-4">
        <Button
          text="Voltar"
          type="button"
          className="bg-[#3b727a]"
          disabled={screen === "english" ? true : false}
          style={{ opacity: screen === "english" ? 0.8 : 1 }}
          onClick={() => handleScreen("english")}
        />
        {screen === "english" && (
          <Button
            text="Adicionar tradução"
            type="button"
            className="bg-[#42929c]"
            //disabled={text.firstPhrase === "" ? true : false}
            onClick={(e) => {
              e.preventDefault();
              user ? handleScreen("portuguese") : alert("Crie sua conta");
            }}
          />
        )}
        {screen === "portuguese" && (
          <Button text="Salvar frase" type="submit" className="bg-[#42929c]" />
        )}
      </nav>
    </>
  );
}
