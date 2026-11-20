import { notFound, redirect } from "next/navigation";
import { ProfileView } from "@/features/profile/ProfileView";
import { isViewer, type Viewer } from "@/features/profile/types";
type P = { params: Promise<{ handle: string }>; searchParams: Promise<{ tab?: string; viewer?: string }> };
export default async function Page({ params, searchParams }: P) {
  const { handle } = await params; const { tab = "overview", viewer } = await searchParams;
  if (handle === "home") redirect("/");
  if (handle !== "kara.siu") notFound();
  // Dev-only override (?viewer=co-attendee) until auth + attendance data exist (Phase 2).
  if (viewer === "blocked") notFound(); // blocked viewers get a generic not-found (never reveal the block)
  const v: Viewer = isViewer(viewer) ? viewer : "owner";
  return <ProfileView handle={handle} tab={tab} viewer={v} />;
}
