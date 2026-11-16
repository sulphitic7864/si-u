export const VIEWERS = ["owner", "co-attendee", "non-attendee", "guest"] as const;

export type Viewer = (typeof VIEWERS)[number];

export function isViewer(value: unknown): value is Viewer {
  return typeof value === "string" && VIEWERS.some((viewer) => viewer === value);
}
