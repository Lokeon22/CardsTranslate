"use client";
import { useState, useContext, createContext } from "react";

interface deleteContextProps {
  delcard: number[];
  setDelcard: React.Dispatch<React.SetStateAction<number[]>>;
  handleChange: ({ e, id }: { e: React.ChangeEvent<HTMLInputElement>; id: number }) => void;
  appear: boolean;
  setAppear: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteCardContext = createContext({} as deleteContextProps);

export const DeleteCardProvider = ({ children }: { children: React.ReactNode }) => {
  const [delcard, setDelcard] = useState<number[]>([]);
  const [appear, setAppear] = useState<boolean>(false);

  const handleChange = ({ e, id }: { e: React.ChangeEvent<HTMLInputElement>; id: number }) => {
    if (e.target.checked) {
      setDelcard([...delcard, id]);
    } else {
      let filteredCard = delcard.filter((n) => n !== id);
      setDelcard(filteredCard);
    }
  };

  return (
    <DeleteCardContext.Provider value={{ delcard, setDelcard, handleChange, appear, setAppear }}>
      {children}
    </DeleteCardContext.Provider>
  );
};

export function useCard() {
  const context = useContext(DeleteCardContext);
  return context;
}
