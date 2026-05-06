import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Cốm Làng Vòng - Đặc sản Hà Nội chính gốc",
    template: "%s | Cốm Làng Vòng",
  },
  description: "Trải nghiệm hương vị Cốm Làng Vòng Hà Nội thơm ngon, chính gốc. Sản phẩm truyền thống, an toàn, đảm bảo chất lượng.",
  keywords: ["cốm làng vòng", "đặc sản hà nội", "cốm ngon", "đặc sản việt nam"],
  authors: [{ name: "Cốm Làng Vòng" }],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://comlangvong.vn",
    siteName: "Cốm Làng Vòng",
    title: "Cốm Làng Vòng - Đặc sản Hà Nội chính gốc",
    description: "Trải nghiệm hương vị Cốm Làng Vòng Hà Nội thơm ngon, chính gốc. Sản phẩm truyền thống, an toàn, đảm bảo chất lượng.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
    >
      <body className="overflow-x-hidden">{children}</body>
    </html>
  );
}
