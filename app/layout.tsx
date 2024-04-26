import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";

const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-eb_garamond",
});

export const metadata: Metadata = {
  title: "Realm Raiders",
  description: "Realm Raiders",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={eb_garamond.variable}>{children}</body>
    </html>
  );
}
