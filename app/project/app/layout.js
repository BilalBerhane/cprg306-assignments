import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata = {
  title: "STEER Starter",
  description: "Simple ride board",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black">
        <div className="mx-auto max-w-3xl p-4">
          <NavBar />
          {children}
        </div>
      </body>
    </html>
  );
}
