export interface CompetitionPhoto {
  src: string;
  alt: string;
  title: string;
  caption?: string;
}

export interface CompetitionUpdate {
  id: string;
  /** Display time, e.g. "10:15 AM" */
  time: string;
  title: string;
  body: string;
}

/**
 * Add live updates here as the competition progresses.
 * Newest entries should appear first.
 */
export const competitionUpdates: CompetitionUpdate[] = [
  {
    id: "kickoff",
    time: "10:00 AM",
    title: "Competition day is here",
    body: "The team is on site and getting ready. Updates and photos will be posted here throughout the day.",
  },
];

/**
 * Add competition photos under `public/images/competition-day/`
 * and list them here.
 */
export const competitionPhotos: CompetitionPhoto[] = [];
