import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "King Chinese Bowl | The Tricity's Favorite Pan-Asian Destination",
  description:
    "Authentic Chinese, Tibetan, Korean & Japanese cuisine across Chandigarh, Mohali & Zirakpur. Steaming bowls, crispy momos, and wok-tossed perfection.",
  keywords: [
    "King Chinese Bowl",
    "Chinese food Chandigarh",
    "Mohali restaurant",
    "Zirakpur food",
    "Pan-Asian cuisine",
    "momos",
    "noodles",
    "thukpa",
  ],
  openGraph: {
    title: "King Chinese Bowl",
    description: "The Tricity's Favorite Pan-Asian Destination",
    type: "website",
    locale: "en_IN",
    url: "https://kingchinesebowl.com",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} antialiased`}
    >
      <body className="bg-obsidian text-ivory overflow-x-hidden font-sans">
        {children}
      </body>
    </html>
  );
}
