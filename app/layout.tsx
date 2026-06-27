import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Paddle Ground Zamboanga",
    template: "%s | Paddle Ground Zamboanga",
  },
  description:
    "Play, learn, compete, and connect with the growing Paddle Ground Zamboanga community.",
  keywords: [
    "Pickleball Basilan",
    "pickleball court",
    "pickleball reservation",
    "pickleball schedule",
    "sports in Basilan",
  ],
  authors: [
    {
      name: "Paddle Ground Zamboanga",
    },
  ],
  creator: "Paddle Ground Zamboanga",
  publisher: "Paddle Ground Zamboanga",
  openGraph: {
    title: "Paddle Ground Zamboanga",
    description:
      "Experience a better way to play, compete, and connect.",
    type: "website",
    locale: "en_PH",
    siteName: "Paddle Ground Zamboangan",
    images: [
      {
        url: "/paddle.jpg",
        width: 1200,
        height: 630,
        alt: "Paddle Ground Zamboanga",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paddle Ground Zamboanga",
    description:
      "Experience a better way to play, compete, and connect in Basilan.",
    images: ["/paddle.jpg"],
  },
  icons: {
    icon: "/paddle.jpg",
    apple: "/paddle.jpg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#fbfafc",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#0c0b0e",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${oswald.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}