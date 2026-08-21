import { warnIfUnsupportedInSimsFont } from "@/lib/utils";
import Plumbob from "./Plumbob";

interface SectionTitleProps {
  children: React.ReactNode;
  /** Plumbob flotando arriba del titulo. */
  withPlumbob?: boolean;
  className?: string;
}

export default function SectionTitle({
  children,
  withPlumbob = true,
  className = "",
}: SectionTitleProps) {
  // La fuente de los titulos no dibuja acentos ni ¿ ¡ : avisa en desarrollo
  // antes de que el texto aparezca con huecos en produccion.
  if (typeof children === "string") warnIfUnsupportedInSimsFont(children);

  return (
    <div className="mb-10 flex flex-col items-center gap-3">
      {withPlumbob && <Plumbob size={30} animation="float" />}
      <h2
        className={`sims-title sims-title-sm text-center text-[34px] md:text-[44px] ${className}`}
      >
        {children}
      </h2>
    </div>
  );
}
