export const dynamic = "force-static";

import Image from "next/image";
import { Radio } from "lucide-react";
import { Navigation } from "@/components/navigation";
import {
  competitionPhotos,
  competitionUpdates,
  type CompetitionPhoto,
  type CompetitionUpdate,
} from "@/lib/competition-day-data";

function UpdatesFeed({ updates }: { updates: CompetitionUpdate[] }) {
  if (updates.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border bg-muted/30 px-6 py-10 text-center text-sm text-muted-foreground">
        Live updates will appear here once the competition begins.
      </p>
    );
  }

  return (
    <ol className="relative space-y-6 border-l border-border pl-6">
      {updates.map((update, index) => (
        <li key={update.id} className="relative">
          <span
            className="absolute -left-[1.6rem] top-1.5 size-3 rounded-full border-2 border-background bg-primary"
            aria-hidden
          />
          <article className="rounded-xl border border-border bg-card p-5 md:p-6">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <time className="text-xs font-medium uppercase tracking-wider text-primary">
                {update.time}
              </time>
              {index === 0 ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  <Radio className="size-3" aria-hidden />
                  Latest
                </span>
              ) : null}
            </div>
            <h3 className="text-lg font-semibold text-foreground">{update.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {update.body}
            </p>
          </article>
        </li>
      ))}
    </ol>
  );
}

function PhotoGrid({ photos }: { photos: CompetitionPhoto[] }) {
  if (photos.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border bg-muted/30 px-6 py-10 text-center text-sm text-muted-foreground">
        Competition photos will be added here throughout the day. Drop images in{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
          public/images/competition-day/
        </code>{" "}
        and list them in{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-xs">
          lib/competition-day-data.ts
        </code>
        .
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {photos.map((photo) => (
        <figure
          key={photo.src}
          className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <figcaption className="space-y-1 p-4">
            <h3 className="text-sm font-semibold text-foreground">{photo.title}</h3>
            {photo.caption ? (
              <p className="text-xs leading-relaxed text-muted-foreground">
                {photo.caption}
              </p>
            ) : null}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

export default function CompetitionDayPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">
              June 6, 2026
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
              Competition Day
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Live updates and photos from the Quetzal team on competition day.
              Check back throughout the event for the latest from the field.
            </p>
          </div>
        </section>

        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-10">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Live Updates
              </h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Play-by-play from the team as events unfold.
              </p>
            </div>
            <UpdatesFeed updates={competitionUpdates} />
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="mb-10">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Photos
              </h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Moments captured on competition day.
              </p>
            </div>
            <PhotoGrid photos={competitionPhotos} />
          </div>
        </section>
      </main>
    </div>
  );
}
