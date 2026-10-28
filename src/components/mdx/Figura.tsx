import Image from "next/image";

type FiguraProps = {
  src: string;
  alt: string;
  legenda?: string;
  credito?: string;
  href?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export function Figura({
  src,
  alt,
  legenda,
  credito = "Foto: StockSnap (CC0)",
  href,
  width = 1200,
  height = 675,
  priority,
}: FiguraProps) {
  return (
    <figure className="my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 760px"
        className="w-full rounded-card border border-line bg-bg-1"
      />
      {(legenda || credito) && (
        <figcaption className="mt-2.5 text-center text-[11px] leading-relaxed text-ink-2/75">
          {legenda}
          {legenda && credito ? " " : null}
          {credito &&
            (href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="underline decoration-line underline-offset-2 hover:text-green"
              >
                {credito}
              </a>
            ) : (
              <span>{credito}</span>
            ))}
        </figcaption>
      )}
    </figure>
  );
}
