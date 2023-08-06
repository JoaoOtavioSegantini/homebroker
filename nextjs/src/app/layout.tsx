import FlowbiteContext from "./components/FlowbiteContex";
import DefaultNavbar from "./components/Navbar";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 h-screen flex flex-col">
        <DefaultNavbar />
        <FlowbiteContext>{children}</FlowbiteContext>
      </body>
    </html>
  );
}
