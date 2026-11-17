import { ConnectionList } from "@/features/connections/ConnectionList";
import { connectionStats } from "@/shared/data/mock";
export default function Page() {
  return (
    <>
      <header className="mb-5">
        <h1 className="text-4xl font-semibold tracking-tight text-brand-deep sm:text-[44px]">Connections</h1>
        <p className="mt-1 text-sm text-[#625a91] sm:text-base">
          People you&apos;ve been in a room with. {connectionStats.online} are online, {connectionStats.live} are live right now.
        </p>
      </header>
      <ConnectionList />
    </>
  );
}
