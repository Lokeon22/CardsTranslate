import { AiOutlineEdit, AiOutlineCloseCircle } from "react-icons/ai";

interface InputUpdateProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  children: React.ReactNode;
}

export function InputUpdate({ state, setState, text, children }: InputUpdateProps) {
  return (
    <>
      {state ? (
        <AiOutlineCloseCircle
          onClick={() => setState(!state)}
          className="w-[22px] h-[22px] absolute text-white right-1.5 top-1.5 cursor-pointer hover:brightness-90 hover:duration-200"
        />
      ) : (
        <AiOutlineEdit
          onClick={() => {
            if (window.speechSynthesis.speaking) return;
            setState(!state);
          }}
          className="w-[22px] h-[22px] absolute text-white right-1.5 top-1.5 cursor-pointer hover:brightness-90 hover:duration-200"
        />
      )}

      {state ? (
        <div className="flex w-max gap-1">{children}</div>
      ) : (
        <p className="mx-auto my-0 text-base text-center overflow-x-auto text-white scroll-smooth scrollbar-thin scrollbar-thumb-[#cedae4] scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
          {text}
        </p>
      )}
    </>
  );
}
