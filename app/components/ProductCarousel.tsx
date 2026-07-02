"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const images = [
  { src: "/images/product/sink-1.jpg", alt: "WuduBasin free-standing wudu sink, front view" },
  { src: "/images/product/sink-2.jpg", alt: "WuduBasin free-standing wudu sink, angled view" },
  { src: "/images/product/sink-3.jpg", alt: "WuduBasin free-standing wudu sink, three-quarter view" },
  { src: "/images/product/sink-4.jpg", alt: "WuduBasin free-standing wudu sink, side view" },
];

const AUTOPLAY_MS = 4000;

export function ProductCarousel() {
  const [index, setIndex] = useState(0);

  const goTo = useCallback((i: number) => {
    setIndex((i + images.length) % images.length);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-sand-200 bg-gradient-to-br from-basin-50 via-sand-50 to-sage-100 shadow-sm">
      {images.map((image, i) => (
        <Image
          key={image.src}
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={`object-cover transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          priority={i === 0}
        />
      ))}

      <button
        type="button"
        onClick={() => goTo(index - 1)}
        aria-label="Previous photo"
        className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow-sm transition hover:bg-white"
      >
        <span aria-hidden>‹</span>
      </button>
      <button
        type="button"
        onClick={() => goTo(index + 1)}
        aria-label="Next photo"
        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow-sm transition hover:bg-white"
      >
        <span aria-hidden>›</span>
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-basin-700" : "w-2 bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
