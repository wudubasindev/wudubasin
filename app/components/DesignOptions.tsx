import Image from "next/image";

const designs = [
  {
    name: "Classic White",
    description: "Our glossy ceramic finish — the sink shown throughout this site.",
    image: "/images/product/sink-1.jpg",
  },
  {
    name: "Carrara Marble",
    description: "A sculpted white marble-look finish with soft, sweeping lines.",
    image: "/images/product/design-white-marble.png",
  },
  {
    name: "Gold-Veined Marble",
    description: "Warm ivory tones threaded with gold veining for a richer look.",
    image: "/images/product/design-gold-marble.png",
  },
];

export function DesignOptions() {
  return (
    <section id="designs" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold text-ink-900 sm:text-4xl">
            Available designs
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-600">
            Every design is the same free-standing, floor-mounted wudu sink —
            choose the finish that fits your space.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {designs.map((design) => (
            <div
              key={design.name}
              className="overflow-hidden rounded-2xl border border-sand-200 bg-sand-50"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src={design.image}
                  alt={`${design.name} wudu sink finish`}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <h3 className="text-base font-semibold text-ink-900">
                  {design.name}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                  {design.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-xs text-ink-400">
          Let us know your preferred finish when you book — we&apos;ll
          confirm availability before your installation date.
        </p>
      </div>
    </section>
  );
}
