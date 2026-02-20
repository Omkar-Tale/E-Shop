import { Assistant } from "next/font/google";
import "./globals.css";

const assistentFont = Assistant({
  subsets: ["latin"],
  variable: "--font-assistant", 
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "E_Shop",
  description: "E-Commerce clothing shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${assistentFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
