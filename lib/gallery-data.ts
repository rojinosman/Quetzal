export type GalleryVersion = "v1" | "v2";

export interface GalleryImage {
  src: string;
  alt: string;
  title: string;
  caption?: string;
}

/** Build and documentation photos from iteration 1 (V1). */
export const galleryImagesV1: GalleryImage[] = [
  {
    src: "/images/foam-wing.jpg",
    alt: "Foam wing cutout on workbench",
    title: "Wing fabrication",
    caption: "Cutting and shaping foam wings",
  },
  {
    src: "/images/servos.jpg",
    alt: "Servo cutouts in foam wing",
    title: "Servo mock cutouts",
    caption: "Precise cutouts for servo installation",
  },
  {
    src: "/images/Aleron-cuts.jpg",
    alt: "Aileron cuts in foam wing",
    title: "Aileron cuts",
    caption: "Cutouts for aileron movement",
  },
  {
    src: "/images/tubing.jpg",
    alt: "Carbon fiber tubing with T-joints",
    title: "Spar connections",
    caption: "T-joints and carbon fiber tubing",
  },
  {
    src: "/images/resining-tube-to-wing.jpg",
    alt: "Resin applied to spar and wing joint",
    title: "Resining spars to wings",
    caption: "Securing spars to the foam wings",
  },
  {
    src: "/images/resined-wings.jpg",
    alt: "Fiberglassed wings",
    title: "Fiberglass resining",
    caption: "Strength and finish on the wings",
  },
  {
    src: "/images/iteration-1-with-cone.jpg",
    alt: "Wings assembled with fuselage cone",
    title: "Iteration 1 assembly",
    caption: "Wings, tubes, and fuselage cone together",
  },
  {
    src: "/images/video-poster.jpg",
    alt: "First flight milestone",
    title: "First flight",
    caption: "Milestone moment from testing",
  },
];

/** Add V2 paths here as new photos are added under `public/images/...`. */
export const galleryImagesV2: GalleryImage[] = [
  {
    src: "/images/gallery/v2/IMG_8413.jpg",
    alt: "Quetzal V2 team build photo IMG 8413",
    title: "V2 build progress",
    caption: "Captured during V2 development",
  },
  {
    src: "/images/gallery/v2/IMG_8531.jpg",
    alt: "Quetzal V2 team build photo IMG 8531",
    title: "V2 build progress",
    caption: "Captured during V2 development",
  },
  {
    src: "/images/gallery/v2/IMG_8532.jpg",
    alt: "Quetzal V2 team build photo IMG 8532",
    title: "V2 build progress",
    caption: "Captured during V2 development",
  },
  {
    src: "/images/gallery/v2/IMG_8601.jpg",
    alt: "Quetzal V2 team build photo IMG 8601",
    title: "V2 build progress",
    caption: "Captured during V2 development",
  },
  {
    src: "/images/gallery/v2/IMG_8602.jpg",
    alt: "Quetzal V2 team build photo IMG 8602",
    title: "V2 build progress",
    caption: "Captured during V2 development",
  },
  {
    src: "/images/gallery/v2/IMG_8603.jpg",
    alt: "Quetzal V2 team build photo IMG 8603",
    title: "V2 build progress",
    caption: "Captured during V2 development",
  },
  {
    src: "/images/gallery/v2/IMG_8613.jpg",
    alt: "Quetzal V2 team build photo IMG 8613",
    title: "V2 build progress",
    caption: "Captured during V2 development",
  },
  {
    src: "/images/gallery/v2/IMG_8934.jpg",
    alt: "Quetzal V2 team build photo IMG 8934",
    title: "V2 build progress",
    caption: "Captured during V2 development",
  },
];
