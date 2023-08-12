"use client";
import { useCard } from "@/context/deleteCardContext";
import { deleteCard } from "@/app/actions";

export function ButtonDelete() {
  const { delcard, setDelcard } = useCard();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (delcard.length > 0) {
          deleteCard({ id: delcard });
          setDelcard([]);
        } else {
          alert("Selecione algum card para deletar");
        }
      }}
      className="bg-red-600 w-max px-3 py-1 rounded ml-auto text-gray-50 hover:duration-200 hover:brightness-90"
      type="button"
    >
      Deletar Card
    </button>
  );
}
