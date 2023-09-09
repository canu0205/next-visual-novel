import "./globals.css";
import { Inter } from "next/font/google";
import Provider from "@/app/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Visual Novel",
  description: "Fully Onchain Visual Novel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        <body className={inter.className}>{children}</body>
      </Provider>
    </html>
  );
}
