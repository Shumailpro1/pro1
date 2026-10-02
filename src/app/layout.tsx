import type { Metadata, Viewport } from "next";
import { Poppins, DM_Sans, Playfair_Display, Anton } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-welcome",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const anton = Anton({
  variable: "--font-about-display",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Shumail Rizwan — Portfolio",
  description: "Visual designer from London. UI Consultant at Ideo.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${dmSans.variable} ${playfair.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="min-h-full" id="top">
        {children}
      </body>
    </html>
  );
}
