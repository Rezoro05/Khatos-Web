import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://khatuna-goguadze.rezoro.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Khatuna Goguadze | Executive Function Trainer",
  description:
    "Neuroscience-informed support for memory, focus, and executive function for children ages 5–12 and adults age 65+.",
  keywords: [
    "executive function trainer",
    "educational neuroscience",
    "memory and focus support",
    "ADHD executive function support",
  ],
  authors: [{ name: "Khatuna Goguadze" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Khatuna Goguadze | Executive Function Trainer",
    description:
      "Practical support for memory, focus, and executive function, grounded in educational neuroscience.",
    type: "website",
    url: siteUrl,
    siteName: "Khatuna Goguadze",
    locale: "en_US",
    images: [
      {
        url: "/og.jpg",
        width: 1536,
        height: 1024,
        alt: "Khatuna Goguadze — Executive function support, grounded in neuroscience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Khatuna Goguadze | Executive Function Trainer",
    description:
      "Neuroscience-informed support for memory, focus, and executive function.",
    images: ["/og.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Khatuna Goguadze",
  url: siteUrl,
  image: `${siteUrl}/images/khatuna-goguadze.jpg`,
  jobTitle: "Executive Function Trainer",
  description:
    "Educational neuroscience specialist offering practical executive-function support for children, people navigating ADHD-related challenges, and older adults.",
  knowsAbout: [
    "Executive function",
    "Educational neuroscience",
    "ADHD support",
    "Memory and attention",
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University College London" },
    { "@type": "CollegeOrUniversity", name: "Birkbeck, University of London" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
