"use client";

import * as React from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FirstFlightVideo() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const [progress, setProgress] = React.useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative aspect-video">
        <video
          ref={videoRef}
          className="size-full object-cover"
          //poster="/images/video-poster.jpg"
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          playsInline
        >
          <source src="/videos/first-flight.mp4" type="video/`mp4`" />
          Your browser does not support the video tag.
        </video>

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/40">
            <Button
              size="lg"
              onClick={togglePlay}
              className="size-20 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Play className="size-8 ml-1" />
              <span className="sr-only">Play video</span>
            </Button>
          </div>
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
          onClick={toggleMute}
          className="text-foreground hover:text-primary"
        >
          {isMuted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
          <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
        </Button>

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
