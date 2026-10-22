import { Martian_Mono, Instrument_Sans } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const display = Martian_Mono({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
});

const body = Instrument_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-body",
  display: "swap",
});

const description =
  "Nitish Kumar Sah — backend engineer and competitive programmer. Secure APIs, async pipelines, caching, system design. Live GitHub, LeetCode, Codeforces and CodeChef stats.";

export const metadata = {
  metadataBase: new URL(profile.site),
  title: "Nitish Kumar Sah · Backend Engineer",
  description,
  keywords: [
    "Nitish Kumar Sah",
    "backend engineer",
    "software engineer",
    "FastAPI",
    "NIT Rourkela",
    "competitive programming",
  ],
  openGraph: {
    title: "Nitish Kumar Sah · Backend Engineer",
    description,
    url: profile.site,
    siteName: "Nitish Kumar Sah",
    images: [{ url: "/og-preview.jpg", width: 1200, height: 630, alt: "Nitish Kumar Sah — backend engineer" }],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/og-preview.jpg"] },
};

export const viewport = {
  themeColor: "#0b0d13",
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
