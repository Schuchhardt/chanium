/**
 * Shared content types. Every page reads its copy from a typed file in /content so new
 * segments, employees, packages, cases and playbooks can be added without touching layout.
 */

import type { FilmKey, StillKey } from "./media";

export type SegmentSlug = "str" | "pm" | "sales" | "luxury";
export type QuoteSegment = SegmentSlug | "other";

export interface Cta {
  label: string;
  href: string;
}

export interface Segment {
  slug: SegmentSlug;
  /** URL path under the root, e.g. "short-term-rentals". */
  path: string;
  /** Short name used in nav and chips. */
  navLabel: string;
  name: string;
  cardLine: string;
  hero: { h1: string; subline: string };
  painsHeading: string;
  pains: string[];
  employeesHeading: string;
  employees: string[];
  packagesHeading: string;
  packages: { slug: string; variant?: string }[];
  caseStudy?: string;
  /** Hero still (and optional film over it), plus the still used on the segment card. */
  media: { still: StillKey; film?: FilmKey; card: StillKey };
  seo: { title: string; description: string; keywords: string[] };
}

export type EmployeeStatus = "available" | "coming-soon";

export interface Employee {
  slug: string;
  name: string;
  segment: SegmentSlug[];
  oneLiner: string;
  dayInTheLife: string[];
  connects: string[];
  /** Package slug this role is sold under today; null when it is quoted as a custom build. */
  buildPackage: string | null;
  priceFrom: string | null;
  timeline: string | null;
  status: EmployeeStatus;
  /** Automation ids (content/quote.ts) preselected when the quote flow starts from this role. */
  automations: string[];
}

export interface Package {
  slug: string;
  name: string;
  outcome: string;
  price: string;
  timeline: string;
  includes: string[];
  segments: SegmentSlug[];
  /** Shown on /packages and the home grid. Unlisted packages only appear on their segment page. */
  listed: boolean;
  kind: "build" | "retainer";
}

export interface CaseStudy {
  slug: string;
  client: string;
  named: boolean;
  segment: SegmentSlug;
  title: string;
  summary: string;
  rows: { area: string; before: string; after: string }[];
  stack: string[];
  link?: Cta;
  image: StillKey;
  seo: { title: string; description: string };
}

export interface Step {
  title: string;
  body: string;
}

export interface PlaybookFrontmatter {
  title: string;
  slug: string;
  segment: SegmentSlug[];
  employee?: string;
  description: string;
  readingTime: string;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  /** Placeholder playbooks render a notice and are excluded from RSS. */
  draft?: boolean;
}
