import "./globals.css";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata = { title: "SI U", icons: { icon: "/assets/Logo.png" } };
export default function Root({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className={`${geist.variable} font-sans antialiased`}>{children}</body></html>;
}
