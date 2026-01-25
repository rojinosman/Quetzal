"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

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

function GalleryImage({
  image,
  index,
  progress,
}: {
  image: (typeof buildImages)[0];
  index: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const start = index / buildImages.length;
  const end = (index + 1) / buildImages.length;

  const opacity = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0.3, 1, 1, 0.3]);
  const scale = useTransform(progress, [start, start + 0.15, end - 0.15, end], [0.85, 1, 1, 0.85]);
  const y = useTransform(progress, [start, start + 0.1, end - 0.1, end], [60, 0, 0, -60]);

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="relative flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[50vw] h-[50vh] md:h-[60vh] rounded-2xl overflow-hidden group"
    >
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
    </motion.div>
  );
}

export function ScrollingGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const x = useTransform(
    smoothProgress,
    [0, 1],
    ["5%", "-70%"]
  );

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 md:gap-10 pl-[5vw]">
          {buildImages.map((image, index) => (
            <GalleryImage
              key={index}
              image={image}
              index={index}
              progress={smoothProgress}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Progress indicator */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-card/80 backdrop-blur-md border border-border/50">
          <span className="text-xs text-muted-foreground">Build Progress</span>
          <div className="w-24 h-1 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              style={{ scaleX: smoothProgress, transformOrigin: "left" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
