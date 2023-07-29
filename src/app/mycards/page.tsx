import { CardFlip } from "@/components/CardFlip";

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
      <h2 className="text-start xl:text-center text-2xl my-5 px-4 font-semibold">Meus cards</h2>
      <div className="max-w-7xl h-ful grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mx-auto my-4 px-2 sm:px-4">
        {data.map((dt, index) => {
          return <CardFlip key={index} n1={dt.n1} n2={dt.n2} />;
        })}
      </div>
    </section>
  );
}
