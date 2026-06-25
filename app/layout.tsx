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
    default: "Pickleball Basilan",
    template: "%s | Pickleball Basilan",
  },
  description:
    "Play, learn, compete, and connect with the growing Pickleball Basilan community.",
  keywords: [
    "Pickleball Basilan",
    "pickleball court",
    "pickleball reservation",
    "pickleball schedule",
    "sports in Basilan",
  ],
  authors: [
    {
      name: "Pickleball Basilan",
    },
  ],
  creator: "Pickleball Basilan",
  publisher: "Pickleball Basilan",
  openGraph: {
    title: "Pickleball Basilan",
    description:
      "Experience a better way to play, compete, and connect in Basilan.",
    type: "website",
    locale: "en_PH",
    siteName: "Pickleball Basilan",
    images: [
      {
        url: "/pickleball-basilan-logo-cropped.webp",
        width: 1200,
        height: 630,
        alt: "Pickleball Basilan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pickleball Basilan",
    description:
      "Experience a better way to play, compete, and connect in Basilan.",
    images: ["/pickleball-basilan-logo-cropped.webp"],
  },
  icons: {
    icon: "/pickleball-basilan-logo-cropped.webp",
    apple: "/pickleball-basilan-logo-cropped.webp",
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