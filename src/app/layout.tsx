import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/components/provider/query-provider";

export const metadata: Metadata = {
  title: "Instant-downloader",
  description:
    "Experience the ultimate convenience with our online youtube audio downloading platform. Unlock the power to instantly download your cherished videos in audio format from YouTube, all at no cost. Seamlessly save, enjoy, and share your favorite content with ease!",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryProvider>
        <body className="w-screen h-screen dark">
          {children}
          <Toaster />
        </body>
      </QueryProvider>
    </html>
  );
}
