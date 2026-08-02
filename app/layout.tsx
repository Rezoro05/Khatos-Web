import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Khatuna Goguadze | Executive Function Trainer",
  description:
    "Neuroscience-informed support for memory, focus, and executive function for children ages 5–12 and adults age 65+.",
  keywords: [
    "executive function trainer",
    "educational neuroscience",
    "memory and focus support",
    "ADHD executive function support",
  ],
  openGraph: {
    title: "Khatuna Goguadze | Executive Function Trainer",
    description:
      "Practical support for memory, focus, and executive function, grounded in educational neuroscience.",
    type: "website",
    images: [
      {
        url: "/images/glass-brain-hero.jpg",
        width: 1536,
        height: 1024,
        alt: "A translucent glass brain illuminated by soft coral light",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khatuna Goguadze | Executive Function Trainer",
    description:
      "Neuroscience-informed support for memory, focus, and executive function.",
    images: ["/images/glass-brain-hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
