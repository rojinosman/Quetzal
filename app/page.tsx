import { Navigation } from "@/components/navigation";
import { ScrollingGallery } from "@/components/scrolling-gallery";
import { FirstFlightVideo } from "@/components/first-flight-video";
import { HeroAurora } from "@/components/shaders/hero-aurora";
import { ParticleField } from "@/components/shaders/particle-field";
import { DroneModelViewer } from "@/components/drone-model-viewer";
import { ArrowRight, Layers, Cpu, Cog, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Hero Section with Aurora Effect */}
        <section className="relative min-h-screen overflow-hidden flex items-center">
          {/* Aurora Background - Only in Hero */}
          <HeroAurora />
          
          {/* Particle Field Overlay */}
          <div className="absolute inset-0 z-0">
            <ParticleField />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-6 py-24 md:py-32">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                <span className="size-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">
                  Engineering Excellence
                </span>
              </div>
              <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl text-balance">
                Building the Future of{" "}
                <span className="text-primary">Flight</span>
              </h1>
              <p className="mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                Follow our journey as we design, build, and test a custom drone
                from the ground up. Every component, every wire, every line of
                code documented.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/team">
                    Meet the Team
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-background/50 backdrop-blur-sm"
                >
                  <a href="#explore-model">Explore 3D Model</a>
                </Button>
              </div>
            </div>

            {/* Tech Stats Cards */}
            <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Layers, label: "Carbon Fiber Frame", value: '5" Build' },
                { icon: Cpu, label: "Flight Controller", value: "F7 Processor" },
                { icon: Cog, label: "Motor Configuration", value: "4x 2300KV" },
                { icon: Zap, label: "Power System", value: "4S LiPo" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-xl border border-border/50 bg-card/30 backdrop-blur-md p-4 transition-all hover:bg-card/50 hover:border-primary/30"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <stat.icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <span className="text-xs uppercase tracking-widest">Scroll</span>
              <svg
                className="size-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </section>

        {/* Build Process - Scrolling Gallery */}
        <section id="build-process" className="bg-background">
          <div className="mx-auto max-w-6xl px-6 pt-20">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-sm font-medium text-primary">
                  Build Progress
                </span>
              </div>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                The Build Journey
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
                From initial concept to final assembly, scroll through each
                phase of our drone construction process.
              </p>
            </div>
          </div>

          <ScrollingGallery />
        </section>

        {/* 3D Model Explorer Section */}
        <section id="explore-model" className="border-b border-border/50 bg-background">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-sm font-medium text-primary">
                  Interactive Experience
                </span>
              </div>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                Explore Every Component
              </h2>
              <p className="mt-4 mx-auto max-w-2xl text-muted-foreground leading-relaxed">
                Dive deep into our drone{"'"}s architecture. Click on component
                markers to learn about each part{"'"}s role in the system.
              </p>
            </div>

            <DroneModelViewer />

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Upload your drone CAD model (GLB/GLTF format) to replace the
                placeholder
              </p>
            </div>
          </div>
        </section>

        {/* First Flight Section */}
        <section className="border-b border-border/50 bg-background">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-sm font-medium text-primary">
                  Milestone Achievement
                </span>
              </div>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                First Flight
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground leading-relaxed">
                The moment of truth. Watch our drone take to the skies for the
                very first time after months of development and testing.
              </p>
            </div>

            <FirstFlightVideo />
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-b border-border/50 bg-background">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-8 md:grid-cols-4">
              {[
                { value: "6", label: "Team Members" },
                { value: "4", label: "Months of Development" },
                { value: "12", label: "Flight Tests" },
                { value: "1", label: "Successful First Flight" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50"
                >
                  <p className="text-4xl font-bold text-primary md:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-background">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="rounded-2xl border border-border/50 bg-card/30 backdrop-blur-md p-8 text-center md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
              <div className="relative z-10">
                <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">
                  Meet the Engineers Behind the Project
                </h2>
                <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
                  Get to know the talented students who made this project
                  possible. View their profiles, read about their contributions,
                  and connect with them on LinkedIn.
                </p>
                <Button asChild size="lg" className="gap-2">
                  <Link href="/team">
                    View Team
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded bg-primary">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="size-4 text-primary-foreground"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-sm font-medium text-foreground">
                Project Falcon
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              A student engineering project
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
