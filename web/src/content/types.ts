export type ContentStatus =
  | "verified"
  | "unverified"
  | "fictional"
  | "illustrative";

export type SourceRef = {
  label: string;
  url?: string;
  period?: string;
};

export type Story = {
  id: string;
  name: string;
  from: string;
  to: string;
  toCountry: string;
  coords: { from: [number, number]; to: [number, number] };
  mobility: string;
  field: string;
  year: string;
  quote: string;
  excerpt: string;
  body?: string[];
  mediaId: string;
} & (
  | { status: "model-story" }
  | { status: "verified"; source: { label: string; url: string } }
);

export type Milestone = {
  id: string;
  year: string;
  title: string;
  body: string;
  status: ContentStatus;
  sources: SourceRef[];
  highlight?: boolean;
  separateTrack?: boolean;
};

export type Stat = {
  checkedAt: string;
  id: string;
  label: string;
  value: number;
  display?: string;
  prefix?: string;
  suffix?: string;
  approx?: boolean;
  unit?: string;
  period: string;
  status: ContentStatus;
  sources: SourceRef[];
  note?: string;
};
