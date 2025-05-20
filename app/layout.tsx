import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/contexts/cart-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { UserProvider } from "@/contexts/user-context";
import { FilterProvider } from "@/contexts/filter-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "pocergeming - Jual Voucher Game Online Termurah & Terpercaya",
  description: "pocergeming adalah partner terpercaya untuk pembelian voucher game online. Menyediakan berbagai voucher game populer, proses cepat, harga bersaing, dan layanan pelanggan terbaik. Top up game favorit Anda dengan mudah dan aman bersama kami.",
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon-16x16.png",
    apple: "/favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CartProvider>
            <UserProvider>
              <FilterProvider>
                <div className="flex min-h-screen flex-col">
                  <Navbar />
                  <main className="flex-1 pt-16">{children}</main>
                  <Footer />
                </div>
                <Toaster />
              </FilterProvider>
            </UserProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
