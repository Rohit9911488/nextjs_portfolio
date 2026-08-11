import type { Metadata } from "next";
import {
  Bebas_Neue,
  Geist,
  JetBrains_Mono,
  Manrope,
  Space_Grotesk,
} from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MaintenanceScreen from "@/components/MaintenanceScreen";
import { getSiteContent } from "@/lib/site";
import { getShutdownEnabled } from "@/lib/shutdown";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-logo",
});

const site = getSiteContent();

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const shutdown = await getShutdownEnabled();

  return (
    <html
      lang="en"
      className={`${geist.variable} ${manrope.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${bebasNeue.variable}`}
    >
      <body>
        {shutdown ? (
          <MaintenanceScreen />
        ) : (
          <>
            <Header />
            <div className="pageMain">{children}</div>
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
