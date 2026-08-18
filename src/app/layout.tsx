import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Osynth Growth Engine — AI Creator Operations & Recommendation Hub",
  description:
    "Production-grade, AI-native creator growth platform connecting UGC generation to cross-platform publishing and an automated Grok-powered performance-to-next-best-action engine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
