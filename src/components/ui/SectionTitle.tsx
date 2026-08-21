interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionTitle({
  children,
  className = "",
}: SectionTitleProps) {
  return (
    <h2
      className={`text-3xl md:text-4xl text-center mb-10 text-[#1A1A1A] ${className}`}
      style={{ fontFamily: "var(--font-playfair)" }}
    >
      {children}
    </h2>
  );
}
