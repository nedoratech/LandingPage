import type { Metadata } from "next";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { BRAND_LOGO, HERO_IMAGE, WORK_IMAGE } from "@/lib/constants";
import "@/lib/fontawesome";
import { FONT_PRELOADS } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nedora — Enterprise software development",
  description:
    "Nedora builds enterprise-grade software and integrations for businesses. Fixed-scope and time-based engagements.",
  icons: {
    icon: BRAND_LOGO.src,
    shortcut: BRAND_LOGO.src,
    apple: BRAND_LOGO.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href={BRAND_LOGO.src}
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href={HERO_IMAGE.src}
          as="image"
          type="image/jpeg"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href={WORK_IMAGE.src}
          as="image"
          type="image/jpeg"
        />
        {FONT_PRELOADS.map((font) => (
          <link
            key={font.href}
            rel="preload"
            href={font.href}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
      </head>
      <body className="min-h-full font-sans font-normal">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
