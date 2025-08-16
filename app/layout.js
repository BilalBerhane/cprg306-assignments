import "./globals.css";
import { Inter, Bebas_Neue } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const display = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-display" });

export const metadata = {
  title: "CPRG 306 Assignments",
  description: "Student work",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body className="font-sans bg-zinc-950 text-zinc-100">
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(255,255,255,0.06),transparent),radial-gradient(800px_400px_at_90%_10%,rgba(255,255,255,0.04),transparent)]" />
        {children}
      </body>
    </html>
  );
}
