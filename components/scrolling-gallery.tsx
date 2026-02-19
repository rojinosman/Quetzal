"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

const buildImages = [
  {
    src: "/images/foam-wing.png",
    alt: "Cut out foam wing",
    title: "Wing Fabrication",
    description: "Constructing the foam wings",
  },
  {
    src: "/images/servos.png",
    alt: "Servo cuttouts in foam wing",
    title: "Servo Mock Cutouts",
    description: "Creating precise cutouts for servo installation",
  },
  {
    src: "/images/Aleron-cuts.png",
    alt: "Aleron cuts in foam wing",
    title: "Aileron Cuts",
    description: "Creating precise cutouts for aileron movement",
  },
  {
    src: "/images/tubing.png",
    alt: "Assembling T-joints to the carbon fiber tubing",
    title: "Spar Connections with T-Joints",
    description: "Connecting carbon fiber tubing spars using T-joints",
  },
  {
    src: "/images/resining-tube-to-wing.png",
    alt: "Resining the carbon fiber tubing to the foam wing",
    title: "Resining the Spars to the Wings",
    description: "Applying resin to secure the spars to the foam wings",
  },
    {
    src: "/images/resined-wings.png",
    alt: "fiberglass resined wings",
    title: "Fiberglass Resining the Wings",
    description: "Applying fiberglass and resin over the foam wings for strength",
  },
  {
    src: "/images/iteration-1-with-cone.png",
    alt: "Completed wings with carbon fiber tubes and fuselage cone",
    title: "Final Assembly of Iteration 1",
    description: "Final assembly of wings, fuselage, and components for first iteration without the electronics",
  },
];

// Shared card content for both mobile and desktop
function GalleryCardContent({
  image,
  index,
}: {
  image: (typeof buildImages)[0];
  index: number;
}) {
  return (
    <>
      <Image
        src={image.src || "/placeholder.svg"}
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <span className="inline-block px-3 py-1 mb-3 text-xs font-medium rounded-full bg-primary/20 text-primary border border-primary/30">
          Phase {index + 1}
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          {image.title}
        </h3>
        <p className="text-sm md:text-base text-muted-foreground">
          {image.description}
        </p>
      </div>
    </>
  );
}

export function ScrollingGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      return;
    }
    setScrollProgress(el.scrollLeft / maxScroll);
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* Horizontal scroll gallery - scroll left/right to browse on all devices */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex w-full overflow-x-auto snap-x snap-mandatory gap-4 md:gap-10 px-[5vw] pb-8 scroll-smooth"
      >
        {buildImages.map((image, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[50vw] h-[55vh] md:h-[60vh] snap-center rounded-2xl overflow-hidden group"
          >
            <GalleryCardContent image={image} index={index} />
          </div>
        ))}
      </div>

      {/* Scrollbar & labels */}
      <div className="w-full max-w-2xl mx-auto px-[5vw] pb-8">
        <div className="h-2 rounded-full bg-muted/80 overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-150"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Phase 1</span>
          <span>Phase {buildImages.length}</span>
        </div>
      </div>
    </div>
  );
}
