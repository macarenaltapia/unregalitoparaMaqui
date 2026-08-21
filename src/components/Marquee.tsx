import { EVENT_DATE_LONG } from "@/data/config";

export default function Marquee() {
  const items = Array(8).fill(EVENT_DATE_LONG).join("  |  ");

  return (
    <div
      className="overflow-hidden py-3 select-none"
      style={{
        background: "linear-gradient(90deg, #6B8CCE, #9B6CB8, #D94F8A)",
      }}
    >
      <div className="animate-marquee flex w-max">
        <span
          className="text-sm md:text-base font-medium tracking-wide text-white px-2"
          style={{ fontFamily: "var(--font-dm)" }}
        >
          {items}
        </span>
        <span
          className="text-sm md:text-base font-medium tracking-wide text-white px-2"
          style={{ fontFamily: "var(--font-dm)" }}
        >
          {items}
        </span>
      </div>
    </div>
  );
}
