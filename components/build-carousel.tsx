"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const buildImages = [
  {
    src: "/images/build-1.jpg",
    alt: "Initial frame assembly",
    caption: "Phase 1: Frame Assembly",
    description: "Constructing the carbon fiber frame",
  },
  {
    src: "/images/build-2.jpg",
    alt: "Motor installation",
    caption: "Phase 2: Motor Installation",
    description: "Mounting brushless motors",
  },
  {
    src: "/images/build-3.jpg",
    alt: "Electronics wiring",
    caption: "Phase 3: Electronics",
    description: "Wiring the flight controller and ESCs",
  },
  {
    src: "/images/build-4.jpg",
    alt: "Propeller mounting",
    caption: "Phase 4: Final Assembly",
    description: "Installing propellers and testing",
  },
];

export function BuildCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {buildImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-card">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="mb-1 text-sm font-medium text-primary">
                    {image.caption}
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {image.description}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 border-border bg-card/80 text-foreground hover:bg-card hover:text-primary" />
        <CarouselNext className="right-4 border-border bg-card/80 text-foreground hover:bg-card hover:text-primary" />
      </Carousel>

      <div className="mt-4 flex items-center justify-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            type="button"
            className={`size-2 rounded-full transition-all ${
              index === current
                ? "w-6 bg-primary"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
