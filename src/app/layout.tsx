import type { Metadata } from "next";
import { Vazirmatn, Markazi_Text, Cormorant } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

const vazir = Vazirmatn({
  variable: "--font-vazir",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const markazi = Markazi_Text({
  variable: "--font-markazi",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "آوین | گالری مبلمان لوکس و دست‌دوز",
  description:
    "آوین؛ خلق مبلمان لوکس و دست‌ساز با بهترین پارچه، بدنه، فوم و پایه. هنر نشستن، دوباره تعریف شد.",
  keywords: [
    "مبلمان لوکس",
    "مبل دست‌دوز",
    "آوین",
    "گالری مبلمان",
    "مبل راحتی",
    "دکوراسیون داخلی",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazir.variable} ${markazi.variable} ${cormorant.variable}`}
    >
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/react-grab/dist/index.global.js"
        />
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
