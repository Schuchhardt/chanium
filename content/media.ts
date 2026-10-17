/**
 * Photography and film for the site, generated with Higgsfield (GPT Image 2.5 stills, Seedance
 * 2.5 image-to-video). Every entry is served from the Higgsfield CDN by default; stills go through
 * next/image. To self-host, run `pnpm media:pull` (downloads every file into /public/media) and set
 * NEXT_PUBLIC_MEDIA_LOCAL=1.
 */

/** Generation results (stills). */
const CDN = "https://d8j0ntlcm91z4.cloudfront.net/user_3D0tIVeECC0Uq35MqAesXsjpubj";
/** Re-encoded uploads (films: H.264, no audio, faststart, ~1–2 MB each). */
const MEDIA_CDN = "https://d2ol7oe51mr4n9.cloudfront.net/user_3D0tIVeECC0Uq35MqAesXsjpubj";
const local = process.env.NEXT_PUBLIC_MEDIA_LOCAL === "1";

export interface Still {
  /** File name under /public/media when self-hosted. */
  file: string;
  /** Source file name on the Higgsfield CDN. */
  cdn: string;
  alt: string;
  width: number;
  height: number;
}

export interface Film {
  file: string;
  cdn: string;
  /** Still shown before the video can play, and instead of it with reduced motion. */
  poster: StillKey;
}

const wide = { width: 2688, height: 1520 };
const tall = { width: 1744, height: 2336 };

export const stills = {
  heroMansion: {
    file: "hero-mansion.png",
    cdn: "hf_20261017_000505_17b2865d-a3db-4d1c-a019-5daec6a7909b.png",
    alt: "Contemporary travertine mansion at dusk with an infinity pool reflecting warm interior lights",
    ...wide,
  },
  strVilla: {
    file: "str-villa.png",
    cdn: "hf_20261017_000506_72c3da05-0d43-4182-ba9f-72db3e6ec4b1.png",
    alt: "Coastal vacation villa terrace with linen loungers above the ocean at sunset",
    ...wide,
  },
  pmBuilding: {
    file: "pm-building.png",
    cdn: "hf_20261017_000506_b7cc36f3-1710-4742-9447-f00af2d08daa.png",
    alt: "Brick mid-rise apartment building with planted balconies in golden-hour light",
    ...wide,
  },
  salesHome: {
    file: "sales-home.png",
    cdn: "hf_20261017_000540_36d5c299-7521-4898-9f3f-e850274d7844.png",
    alt: "White modern farmhouse with a wide lawn and oak trees at golden hour",
    ...wide,
  },
  luxuryHills: {
    file: "luxury-hills.png",
    cdn: "hf_20261017_000505_18fa5cc3-104a-4139-b794-70d4fe0357b6.png",
    alt: "Glass hillside mansion at night above the lights of Los Angeles",
    ...wide,
  },
  living: {
    file: "living.png",
    cdn: "hf_20261017_000540_2ba9bdf4-72d2-41c8-8627-89c9ef88a66c.png",
    alt: "Minimalist living room with travertine walls, a curved boucle sofa and garden views",
    ...wide,
  },
  kitchen: {
    file: "kitchen.png",
    cdn: "hf_20261017_000506_b5d9baec-29c7-415f-a936-cf3967e99447.png",
    alt: "Marble waterfall island and walnut cabinetry in a light-filled kitchen",
    ...wide,
  },
  penthouse: {
    file: "penthouse.png",
    cdn: "hf_20261017_000506_81d4a6ba-15e3-49bf-9dd9-04fe5f02230a.png",
    alt: "Penthouse living room overlooking the Manhattan skyline at blue hour",
    ...wide,
  },
  suite: {
    file: "suite.png",
    cdn: "hf_20261017_000506_61a6071c-4e7d-4576-b639-b592be640547.png",
    alt: "Beach-house bedroom suite opening onto an ocean-view terrace",
    ...wide,
  },
  staircase: {
    file: "staircase.png",
    cdn: "hf_20261017_000555_885413af-3948-43ce-9a4d-0a18946af13d.png",
    alt: "Sculptural curved travertine staircase lit by a beam of sunlight",
    ...tall,
  },
  desertModern: {
    file: "desert-modern.png",
    cdn: "hf_20261017_000505_28ef3b2d-47fe-47c4-9fa9-73d6da2b37e7.png",
    alt: "Mid-century desert home with a turquoise pool and palm trees",
    ...tall,
  },
  keys: {
    file: "keys.png",
    cdn: "hf_20261017_000555_0fb1543f-99ea-482e-89fb-aee3c7ab3780.png",
    alt: "Brass house keys on a leather fob resting on a travertine console",
    ...tall,
  },
} satisfies Record<string, Still>;

export type StillKey = keyof typeof stills;

export const films = {
  heroMansion: {
    file: "hero-mansion.mp4",
    cdn: "f83ed37b-7630-4b78-830f-18c7e0d85573.mp4",
    poster: "heroMansion",
  },
  luxuryHills: {
    file: "luxury-hills.mp4",
    cdn: "0c35b401-6dcf-4d96-9250-785c33ee005e.mp4",
    poster: "luxuryHills",
  },
  strVilla: {
    file: "str-villa.mp4",
    cdn: "f00d8c6b-3d3f-4f8b-a43f-3cbeecf83353.mp4",
    poster: "strVilla",
  },
  penthouse: {
    file: "penthouse.mp4",
    cdn: "34afcd84-6011-4c16-8cc8-3247e8d09cc5.mp4",
    poster: "penthouse",
  },
} satisfies Record<string, Film>;

export type FilmKey = keyof typeof films;

export function stillSrc(key: StillKey) {
  const s: Still = stills[key];
  return local ? `/media/${s.file}` : `${CDN}/${s.cdn}`;
}

export function filmSrc(key: FilmKey) {
  const f: Film = films[key];
  return local ? `/media/${f.file}` : `${MEDIA_CDN}/${f.cdn}`;
}

export function getStill(key: StillKey) {
  return { ...(stills[key] as Still), src: stillSrc(key) };
}
