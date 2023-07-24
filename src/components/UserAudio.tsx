"use client";
import { useState, useRef } from "react";
import { BsFillPlayCircleFill, BsPauseCircleFill } from "react-icons/bs";

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
    if (textRef.current.value !== "" && window.speechSynthesis.speaking === false) {
      textRef.current.value = "";
      text.firstPhrase = "";
      text.traduPhrase = "";
    } else {
      return;
    }
  }

  function handleAudio() {
    let audio = new SpeechSynthesisUtterance(textRef.current.value);
    if (play === false && textRef.current.value !== "") {
      audio.lang = language;
      window.speechSynthesis.speak(audio);
      setPlay(!play);
      audio.onend = () => {
        return setPlay(false);
      };
    } else if (play === true) {
      window.speechSynthesis.cancel();
      setPlay(!play);
    }
  }

  function onChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;
    setLanguage(value);
  }

  function handleScreen(step: "english" | "portuguese") {
    if (window.speechSynthesis.speaking === true) {
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
      <form action={createCard} className="w-full px-3 sm:px-0 sm:w-auto">
        {screen === "english" && (
          <textarea
            className="min-w-full sm:min-w-[400px] h-28 bg-transparent border border-white outline-none rounded p-2"
            placeholder="Digite a frase"
            name="nome1"
            ref={textRef}
            value={text.firstPhrase}
            onChange={({ target }) =>
              setText((prevState) => ({ ...prevState, firstPhrase: target.value }))
            }
          />
        )}

        {screen === "portuguese" && (
          <div className="min-w-full sm:min-w-[400px]">
            <p className="text-gray-200 mb-1">{text.firstPhrase}</p>
            <textarea
              className="w-full h-28 bg-transparent border border-white outline-none rounded p-2"
              placeholder="Agora digite a tradução"
              name="nome2"
              ref={textRef}
              value={text.traduPhrase}
              onChange={({ target }) =>
                setText((prevState) => ({ ...prevState, traduPhrase: target.value }))
              }
            />
          </div>
        )}

        <div className="flex items-center justify-between px-1 my-2">
          {play ? (
            <>
              <button
                onClick={handleAudio}
                type="button"
                className="flex items-center gap-2 hover:brightness-90 hover:duration-200"
              >
                <BsPauseCircleFill className="w-5 h-5" />
                Stop
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleAudio}
                type="button"
                className="flex items-center gap-2 hover:brightness-90 hover:duration-200"
              >
                <BsFillPlayCircleFill className="w-5 h-5" />
                Play
              </button>
            </>
          )}
          <select
            onChange={onChange}
            className="text-black outline-none rounded-sm h-8 px-1 cursor-pointer"
          >
            <option value={"en-US"}>Inglês - EUA</option>
            <option value={"pt-BR"}>Português - Brasil</option>
          </select>
          <button
            className="bg-red-600 px-2 py-1 rounded hover:brightness-90 hover:duration-200"
            type="button"
            onClick={clearText}
          >
            Limpar
          </button>
        </div>
        <nav className="w-full flex items-center justify-between gap-4">
          <button
            onClick={() => handleScreen("english")}
            type="button"
            disabled={screen === "english" ? true : false}
            style={{ opacity: screen === "english" ? 0.8 : 1 }}
            className="bg-gray-600 w-full rounded-sm hover:brightness-90 hover:duration-200"
          >
            Voltar
          </button>
          {screen === "english" ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleScreen("portuguese");
              }}
              type="button"
              disabled={text.firstPhrase == "" ? true : false}
              className="bg-gray-500 w-full rounded-sm hover:brightness-90 hover:duration-200"
            >
              Adicionar tradução
            </button>
          ) : (
            <button
              className="w-full bg-green-600 rounded-sm hover:brightness-90 hover:duration-200"
              type="submit"
            >
              Salvar frase
            </button>
          )}
        </nav>
      </form>
    </>
  );
}
