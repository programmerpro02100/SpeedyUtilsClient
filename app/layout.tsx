"use client"; // Ensure this runs on the client

import "bootstrap/dist/css/bootstrap.min.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from "react-redux"; // Import Redux Provider
import { store } from "@/store/store"; // Adjust path to your Redux store
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
