import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { site } from "@/content/site";
import { fontClassNames } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – ${site.tagline}`,
    template: `%s – ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "de_CH",
    siteName: site.name,
    title: `${site.name} – ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  // Die Farbe des Headers – die Statusleiste auf dem Handy zieht mit.
  themeColor: "#332419",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={fontClassNames}>
      <head>
        {/*
          Ohne JavaScript würde nichts sichtbar, weil die Einblend-Animation
          bei Deckkraft 0 startet. Dann zeigen wir alles sofort und ohne
          Bewegung – die Seite bleibt vollständig lesbar.
        */}
        <noscript>
          <style>{`.reveal,.reveal-image{opacity:1!important;transform:none!important;clip-path:none!important}.reveal-image img{transform:none!important}.hairline{transform:scaleX(1)!important}`}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#inhalt"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-espresso focus:px-4 focus:py-2 focus:text-cream"
        >
          Zum Inhalt springen
        </a>

        <SiteHeader />
        <main id="inhalt" className="page-in">
          {children}
        </main>
        <SiteFooter />

        {/* Vercel Web Analytics: zählt Seitenaufrufe ohne Cookies und ohne
            Profile. Läuft nur auf Vercel – lokal bleibt es stumm. Erwähnt in
            der Datenschutzerklärung unter „Webanalyse". */}
        <Analytics />
      </body>
    </html>
  );
}
