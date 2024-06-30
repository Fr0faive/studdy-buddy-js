import { Inter } from "next/font/google";
import "./globals.css";
import BotNav from "./_components/shared/BotNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Study Buddy - Make Learning Easier",
  description: "Study Buddy - Make Learning Easier",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-[390px] mx-auto bg-white text-[#074951] overflow-hidden">
          {children}
          <BotNav />
        </main>
      </body>
    </html>
  );
}
