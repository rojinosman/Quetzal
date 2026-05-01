export const dynamic = "force-static";

import { Navigation } from "@/components/navigation";
import { DroneModelViewer } from "@/components/drone-model-viewer";

export default function ModelV1Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="mx-auto max-w-6xl px-6 pb-20 pt-24">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl">
            3D Model — Iteration 1 (V1)
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Loaded from{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
              /models/drone.glb
            </code>
            . Use the tabs to open V2.
          </p>
        </div>
        <DroneModelViewer initialVersion="v1" />
      </main>
    </div>
  );
}
