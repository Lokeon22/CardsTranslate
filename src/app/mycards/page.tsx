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
    <section className="w-full h-full flex flex-col items-stretch sm:items-center sm:h-screen bg-black text-white">
      <h2 className="text-3xl my-20">Cards page</h2>
      <div className="w-full max-w-7xl flex flex-row items-center justify-center flex-wrap gap-4 px-2">
        {data.map((dt, index) => {
          return <CardFlip key={index} n1={dt.n1} n2={dt.n2} />;
        })}
      </div>
    </section>
  );
}
