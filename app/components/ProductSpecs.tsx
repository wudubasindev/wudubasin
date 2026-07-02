import { ProductCarousel } from "./ProductCarousel";

const specs = [
  { label: "Material", value: "Ceramic, glossy polished finish" },
  { label: "Dimensions", value: "485 × 450 × 860 mm" },
  { label: "Basin shape", value: "Square, modern profile" },
  { label: "Capacity", value: "12 litres" },
  { label: "Installation", value: "Floor-mounted, free-standing pedestal" },
  { label: "Faucet", value: "Single-hole, lever handle" },
  { label: "Included", value: "Drainer" },
  { label: "Warranty", value: "3 years on the fixture" },
];

export function ProductSpecs() {
  return (
    <section id="the-sink" className="bg-sand-100 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-semibold text-ink-900 sm:text-4xl">
              A wudu sink built to last
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600">
              A modern, free-standing ceramic wudu basin designed for
              comfortable hand, face, and foot washing in one fixture.
              Finished in glossy ceramic and set on a floor-mounted pedestal,
              it&apos;s built to hold up to daily use at home, at the mosque,
              or in a school washroom.
            </p>

            <dl className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="border-b border-sand-200 pb-3"
                >
                  <dt className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                    {spec.label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-ink-900">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="order-1 lg:order-2">
            <ProductCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
