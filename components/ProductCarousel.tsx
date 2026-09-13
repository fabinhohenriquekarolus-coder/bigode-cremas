"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export function ProductCarousel({
  images,
  alt,
  outOfStock = false,
  onImageClick,
}: {
  images: string[];
  alt: string;
  outOfStock?: boolean;
  onImageClick?: (index: number) => void;
}) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const go = (next: number) => {
    setIndex(Math.max(0, Math.min(images.length - 1, next)));
  };

  return (
    <div
      className={`relative aspect-square w-full select-none overflow-hidden bg-panel-line ${
        onImageClick ? "cursor-zoom-in" : ""
      }`}
      onClick={() => onImageClick?.(index)}
    >
      <div
        className="flex h-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const delta = e.changedTouches[0].clientX - touchStartX.current;
          if (delta < -40) go(index + 1);
          else if (delta > 40) go(index - 1);
          touchStartX.current = null;
        }}
      >
        {images.map((src, i) => (
          <div key={src + i} className="relative h-full w-full shrink-0">
            <Image
              src={src}
              alt={alt}
              fill
              className={`object-cover ${outOfStock ? "opacity-40 grayscale" : ""}`}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          {index > 0 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(index - 1);
              }}
              aria-label="Foto anterior"
              className="absolute left-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-ink/60 text-cloud hover:bg-ink/80"
            >
              ‹
            </button>
          )}
          {index < images.length - 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(index + 1);
              }}
              aria-label="Próxima foto"
              className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-ink/60 text-cloud hover:bg-ink/80"
            >
              ›
            </button>
          )}
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  go(i);
                }}
                aria-label={`Ir para foto ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-4 bg-cloud" : "w-1.5 bg-cloud/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
