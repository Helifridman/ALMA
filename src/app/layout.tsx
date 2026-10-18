import type { Metadata, Viewport } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

const rubik = Rubik({ subsets: ["hebrew", "latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-rubik", display: "swap" });

export const metadata: Metadata = {
  title: "EnglishQuest Israel – לומדים אנגלית במשחק",
  description: "אפליקציית משחק ללימוד אנגלית לילדים דוברי עברית, כיתות ד'–ו'",
  manifest: "/manifest.webmanifest",
  applicationName: "EnglishQuest",
  appleWebApp: { capable: true, title: "EnglishQuest", statusBarStyle: "default" },
  icons: { icon: "/icons/icon-192.png", apple: "/icons/icon-192.png" },
};

export const viewport: Viewport = {
  themeColor: "#6d4df2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl" className={rubik.variable}>
      <body className="font-sans antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
