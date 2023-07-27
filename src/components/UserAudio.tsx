"use client";
import { useState, useRef } from "react";
import { BsFillPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";

import { PlayerButton } from "./PlayerButton";
import { TextArea } from "./Textarea";
import { Button } from "./Button";

export function UserAudio() {
  const [play, setPlay] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("en-US");
  const [screen, setScreen] = useState<"english" | "portuguese">("english");

  const [text, setText] = useState({
    firstPhrase: "",
    traduPhrase: "",
  });

  const textRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  function clearText() {
    const speaking = window.speechSynthesis.speaking;
    if (textRef.current.value !== "" && !speaking && screen === "english") {
      textRef.current.value = "";
      text.firstPhrase = "";
    } else if (textRef.current.value !== "" && !speaking && screen === "portuguese") {
      textRef.current.value = "";
      text.traduPhrase = "";
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
  }

  function createCard() {
    if (text.traduPhrase == "") {
      return;
    }
    alert("Card adicionado");
    window.location.reload();
  }

  return (
    <>
      <form action={createCard} className="w-full sm:max-w-xl px-1 sm:px-0 sm:w-auto">
        {screen === "english" && (
          <TextArea
            placeholder="Digite a frase"
            textRef={textRef}
            value={text.firstPhrase}
            onChange={({ target }) =>
              setText((prevState) => ({ ...prevState, firstPhrase: target.value }))
            }
          />
        )}

        {screen === "portuguese" && (
          <div className="min-w-full sm:min-w-[400px]">
            <p className="w-max font-medium text-gray-700 border-b-[1px] border-blue-400 rounded-sm mb-2">
              {text.firstPhrase}
            </p>
            <TextArea
              placeholder="Agora digite a tradução"
              textRef={textRef}
              value={text.traduPhrase}
              onChange={({ target }) =>
                setText((prevState) => ({ ...prevState, traduPhrase: target.value }))
              }
            />
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
            className="bg-red-600 w-auto sm:w-1/5 px-2 py-1"
            onClick={clearText}
          />
        </section>
        <nav className="w-full flex items-center justify-between gap-4">
          <Button
            text="Voltar"
            type="button"
            className="bg-blue-600"
            disabled={screen === "english" ? true : false}
            style={{ opacity: screen === "english" ? 0.8 : 1 }}
            onClick={() => handleScreen("english")}
          />
          {screen === "english" ? (
            <Button
              text="Adicionar tradução"
              type="button"
              className="bg-blue-400"
              disabled={text.firstPhrase === "" ? true : false}
              onClick={(e) => {
                e.preventDefault();
                handleScreen("portuguese");
              }}
            />
          ) : (
            <Button text="Salvar frase" type="submit" className="bg-blue-400" />
          )}
        </nav>
      </form>
    </>
  );
}
