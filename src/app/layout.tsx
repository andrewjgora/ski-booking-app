import { Footer } from './../components/Footer';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopNav } from "@/components/TopNav";
import { ResortsProvider } from "@/context/ResortsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SlopeFinder App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col h-screen`}>
        <ResortsProvider>
          <TopNav />
          {children}
        </ResortsProvider>
        <Footer />
      </body>
    </html>
  );
}
