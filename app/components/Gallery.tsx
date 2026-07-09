import Image from "next/image";
import { HomeIcon, BookIcon } from "./icons";

const items = [
  {
    label: "Mosque installation",
    image: "/images/product/design-gold-marble-mosque.png",
  },
  { label: "Home bathroom", icon: HomeIcon },
  { label: "Islamic school washroom", icon: BookIcon },
];

export function Gallery() {
  return (
    <section id="gallery" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-ink-900 sm:text-4xl">
            Example installs
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-600">
            More photos from real installs are coming soon — here&apos;s a
            preview of the spaces we serve.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {items.map((item) =>
            item.image ? (
              <div
                key={item.label}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-sand-200"
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink-900">
                  {item.label}
                </span>
              </div>
            ) : (
              <div
                key={item.label}
                className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-2xl border border-sand-200 bg-gradient-to-br from-sand-100 via-sand-50 to-basin-50"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/80 text-basin-700 shadow-sm">
                  {item.icon && <item.icon className="h-7 w-7" />}
                </span>
                <span className="text-sm font-medium text-ink-600">
                  {item.label}
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
