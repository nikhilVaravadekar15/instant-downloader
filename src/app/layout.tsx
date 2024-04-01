import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import QueryProvider from "@/components/provider/query-provider";
import { ThemeProvider } from "@/components/provider/theme-provider";

export const metadata: Metadata = {
  title: "Instant-downloader",
  description:
    "Experience the ultimate convenience with our online video downloading platform. Unlock the power to instantly download your cherished videos from YouTube, all at no cost. Seamlessly save, enjoy, and share your favorite content with ease!",
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
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={true}
            disableTransitionOnChange={true}
          >
            <Header />
            {children}
            <Footer />
            <Toaster />
          </ThemeProvider>
        </body>
      </QueryProvider>
    </html>
  );
}
