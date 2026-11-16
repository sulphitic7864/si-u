import { notFound } from "next/navigation";
import { ProfileView } from "@/features/profile/ProfileView";
import { Viewer, viewers } from "@/features/profile/ProfileActions";
type P = { params: Promise<{ handle: string }>; searchParams: Promise<{ tab?: string; viewer?: string }> };
export default async function Page({ params, searchParams }: P) {
  const { handle } = await params; const { tab = "overview", viewer } = await searchParams;
  // Dev-only override (?viewer=co-attendee) until auth + attendance data exist (Phase 2).
  if (viewer === "blocked") notFound(); // blocked viewers get a generic not-found (never reveal the block)
  const v = (viewers as string[]).includes(viewer ?? "") ? (viewer as Viewer) : "owner";
  return <ProfileView handle={handle} tab={tab} viewer={v} />;
}
