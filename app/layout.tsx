import "./globals.css";
export const metadata = { title: "SI U" };
export default function Root({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="font-sans antialiased">{children}</body></html>;
}
