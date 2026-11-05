import { Archivo } from "next/font/google";
import localFont from "next/font/local";
import "../app/globals.css";
import { Metadata } from "next";
import "lenis/dist/lenis.css";
import SmoothScroll from "@/components/smooth-scroll/SmoothScroll";
import Header from "@/components/header/Header";
import AccessibilityWidget from "@/components/accessibility/AccessibilityWidget";
import { A11yProvider } from "@/components/accessibility/AccessibilityContext";
import "@/components/accessibility/accessibility.scss";
import FloatingBar from "@/components/floating-bar/FloatingBar";

// Headings
const mukta = localFont({
  src: [

    {
      path: "../assets/fonts/mukta/Mukta-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/mukta/Mukta-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/mukta/Mukta-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/mukta/Mukta-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/mukta/Mukta-ExtraBold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-mukta",
  display: "swap",
});


export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  title: "Mahesh Sutar",
  description: "Senior Fronrend Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${mukta.variable}`}
    >
      
      <body>
        <A11yProvider>
          <SmoothScroll />
          <Header />
          {children}
          <AccessibilityWidget />
          <FloatingBar />
        </A11yProvider>
      </body>
    </html>
  );
}
