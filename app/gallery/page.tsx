export const dynamic = "force-static";

import Image from "next/image";
import { Navigation } from "@/components/navigation";
import {
  galleryImagesV1,
  galleryImagesV2,
  type GalleryImage,
} from "@/lib/gallery-data";

function GalleryGrid({ items }: { items: GalleryImage[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <figure
          key={item.src}
          className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <figcaption className="space-y-1 p-4">
            <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
            {item.caption ? (
              <p className="text-xs leading-relaxed text-muted-foreground">
                {item.caption}
              </p>
            ) : null}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function VersionSection({
  title,
  subtitle,
  items,
  emptyMessage,
}: {
  title: string;
  subtitle: string;
  items: GalleryImage[];
  emptyMessage: string;
}) {
  return (
    <section className="border-b border-border last:border-b-0">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>
        </div>
        {items.length > 0 ? (
          <GalleryGrid items={items} />
        ) : (
          <p className="rounded-xl border border-dashed border-border bg-muted/30 px-6 py-10 text-center text-sm text-muted-foreground">
            {emptyMessage}
          </p>
        )}
      </div>
    </section>
  );
}

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
              Gallery
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
              Behind the build
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Photos from the team during development of Version 1 and Version 2
              of the Quetzal VTOL.
            </p>
          </div>
        </section>

        <VersionSection
          title="Version 2"
          subtitle="Quetzal V2 — build documentation as the airframe evolves."
          items={galleryImagesV2}
          emptyMessage="More V2 photos will appear here as the team documents the build."
        />

        <VersionSection
          title="Version 1"
          subtitle="Iteration 1 — fabrication, assembly, and early integration."
          items={galleryImagesV1}
          emptyMessage="No V1 photos are listed yet."
        />
      </main>
    </div>
  );
}
