export const dynamic = "force-static";

import Image from "next/image";
import { Navigation } from "@/components/navigation";

export default function DesignDayPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
              Design Day
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
              Interactive camera targets
            </h1>
            <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Hold your phone up to the camera and point it at one of the targets
              below.
            </p>
          </div>
        </section>

        <section>
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-2">
            <article className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="relative aspect-square bg-muted">
                <Image
                  src="/images/design-day/marker.png"
                  alt="Design day fiducial marker"
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div>
              <div className="border-t border-border p-4">
                <h2 className="text-lg font-semibold text-foreground">Marker Target</h2>
              </div>
            </article>

            <article className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="relative aspect-square bg-muted">
                <Image
                  src="/images/design-day/target.png"
                  alt="Design day bullseye target"
                  fill
                  className="object-contain p-4"
                  priority
                />
              </div>
              <div className="border-t border-border p-4">
                <h2 className="text-lg font-semibold text-foreground">Bullseye Target</h2>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
