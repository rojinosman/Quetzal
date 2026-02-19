"use client";

import * as React from "react";
import { Play, Pause, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

const LOOP_END_SECONDS = 38;

export function FirstFlightVideo() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    if (video.currentTime >= LOOP_END_SECONDS) {
      video.currentTime = 0;
    }
    setProgress((video.currentTime / LOOP_END_SECONDS) * 100);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = Math.min(pos * LOOP_END_SECONDS, LOOP_END_SECONDS);
    }
  };

  const handleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (el.requestFullscreen) {
        await el.requestFullscreen();
      } else if ((el as HTMLDivElement & { webkitRequestFullscreen?: () => void }).webkitRequestFullscreen) {
        (el as HTMLDivElement & { webkitRequestFullscreen: () => void }).webkitRequestFullscreen();
      }
    } catch {
      // Fullscreen may be blocked (e.g. not from user gesture)
    }
  };

  return (
    <div ref={containerRef} className="relative overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          className="size-full object-cover cursor-pointer"
          poster="/images/video-poster.jpg"
          muted
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => {
            // Loop: seek to start and continue (ended only fires if we didn't catch it in timeUpdate)
            if (videoRef.current) {
              videoRef.current.currentTime = 0;
              videoRef.current.play();
            }
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onClick={togglePlay}
          playsInline
        >
          <source src="/videos/first-flight.mp4" type="video/mp4" />
          <source src="/videos/first-flight.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>

        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-background/40 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
            aria-label="Play video"
          >
            <span className="flex size-20 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <Play className="size-8 ml-1" />
            </span>
          </button>
        )}
        {isPlaying && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 cursor-pointer"
            aria-label="Pause video"
          />
        )}
      </div>

      <div className="flex items-center gap-4 bg-card/95 p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlay}
          className="text-foreground hover:text-primary"
        >
          {isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
          <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
        </Button>

        <div
          className="group relative h-1 flex-1 cursor-pointer rounded-full bg-muted"
          onClick={handleProgressClick}
        >
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 size-3 rounded-full bg-primary opacity-0 transition-opacity group-hover:opacity-100"
            style={{ left: `calc(${progress}% - 6px)` }}
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleFullscreen}
          className="text-foreground hover:text-primary"
        >
          <Maximize className="size-5" />
          <span className="sr-only">Fullscreen</span>
        </Button>
      </div>
    </div>
  );
}
