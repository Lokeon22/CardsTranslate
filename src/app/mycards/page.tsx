import { CardFlip } from "@/components/CardFlip";
import Link from "next/link";

export default function MyCards() {
  const data = [
    { n1: "Test a new phrase", n2: "Traducao aqui" },
    { n1: "Test a new phrase22", n2: "Traducao aqui2" },
    { n1: "Test a new phrase33", n2: "Traducao aqui3" },
    { n1: "Test a new phrase44", n2: "Traducao aqui4" },
    { n1: "Test a new phrase55", n2: "Traducao aqui5" },
    { n1: "Test a new phrase66", n2: "Traducao aqui6" },
    { n1: "Test a new phrase77", n2: "Traducao aqui7" },
  ];

  return (
    <section className="w-full h-full bg-gray-200 animate-changeOpDire">
      <div className="max-w-7xl flex items-center gap-5 mx-auto my-0 px-2 sm:px-4 mt-5">
        <h2 className="text-xl font-semibold uppercase">Meus cards</h2>
        <Link
          className="border-2 border-[#42929c] px-4 py-1.5 w-max uppercase text-sm hover:bg-[#43818A] hover:duration-500 hover:text-blue-100"
          href={"/"}
        >
          Criar card
        </Link>
      </div>

      <div className="max-w-7xl h-ful grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mx-auto my-4 px-2 sm:px-4">
        {data.map((dt, index) => {
          return <CardFlip key={index} n1={dt.n1} n2={dt.n2} />;
        })}
      </div>
    </section>
  );
}
