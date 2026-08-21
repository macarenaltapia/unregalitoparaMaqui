import { EVENT_DATE_LONG } from "@/data/config";

export default function Marquee() {
  // El rombo hace de separador, como un plumbob chiquito en linea.
  const items = Array(8).fill(EVENT_DATE_LONG).join("  ◆  ");

  return (
    <div
      className="overflow-hidden py-3 select-none border-y-2 border-white/60"
      style={{
        background: "linear-gradient(90deg, #0B7FB4, #16B6E8, #2FD44A, #16B6E8, #0B7FB4)",
        boxShadow: "0 4px 20px -6px rgba(11, 127, 180, 0.6)",
      }}
    >
      <div className="animate-marquee flex w-max">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="text-sm md:text-base font-semibold tracking-wide text-white px-2"
            style={{
              fontFamily: "var(--font-fredoka)",
              textShadow: "0 1px 3px rgba(10, 42, 64, 0.4)",
            }}
          >
            {items}
          </span>
        ))}
      </div>
    </div>
  );
}
