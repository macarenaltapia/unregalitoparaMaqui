interface SectionProps {
  children: React.ReactNode;
  maxWidth?: "content" | "form";
  className?: string;
  id?: string;
}

const maxWidths = {
  content: "max-w-2xl",
  form: "max-w-lg",
};

export default function Section({
  children,
  maxWidth = "content",
  className = "",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`px-6 py-12 ${maxWidths[maxWidth]} mx-auto w-full ${className}`}
    >
      {children}
    </section>
  );
}
