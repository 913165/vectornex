import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "./components/header"
import Footer from "./components/footer"
import { ThemeProvider } from "./providers/ThemeProvider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "200 700",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 700",
});

export const metadata: Metadata = {
  title: "Next.js App | Modern Web Application",
  description: "A modern web application built with Next.js",
  keywords: ["Next.js", "React", "TypeScript", "Web Development"],
  authors: [{ name: "Your Name" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors`}
        >
          <ThemeProvider>
            <div className="flex flex-col min-h-screen transition-colors">
              <Header />
              <main className="flex-grow container mx-auto px-0 transition-colors">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
  );
}