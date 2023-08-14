"use client";
import { useCard } from "@/context/deleteCardContext";
import { toast } from "react-toastify";
import { deleteCard } from "@/app/actions";

export function ButtonDelete() {
  const { delcard, setDelcard, appear, setAppear } = useCard();

  const handleAppear = () => setAppear(!appear);

  const notify = () =>
    toast.success("Card deletado", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  function handleDelCard(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (delcard.length > 0) {
      deleteCard({ id: delcard });
      setDelcard([]);
      setAppear(false);
      notify();
    } else {
      alert("Selecione algum card para deletar");
    }
  }

  return (
    <>
      {appear ? (
        <div className="flex gap-4 items-center ml-auto text-sm">
          <button
            onClick={handleAppear}
            className="w-max px-3 py-1.5 rounded bg-gray-600 text-gray-200"
            type="button"
          >
            Cancelar
          </button>
          <button
            onClick={(e) => handleDelCard(e)}
            className="bg-red-600 w-max px-3 py-1.5 rounded text-gray-50 hover:duration-200 hover:brightness-90"
            type="button"
          >
            Confirmar
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={handleAppear}
            className="bg-red-600 w-max px-3 py-1.5 rounded ml-auto text-gray-50 hover:duration-200 hover:brightness-90 text-sm"
            type="button"
          >
            Deletar Card
          </button>
        </>
      )}
    </>
  );
}
