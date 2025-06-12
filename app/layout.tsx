// FILE: /app/layout.tsx
"use client"; // This is now a client component because ProfileProvider uses state.

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ProfileProvider } from '@/lib/context/ProfileContext'; // Import the provider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Note: Metadata is typically handled in Server Components. 
// Since this is now a Client Component, you might manage the title in other ways if needed.
// export const metadata: Metadata = {
//   title: "Sarastya PKL App",
//   description: "Web app for managing PKL registration",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* ProfileProvider now wraps all pages */}
        <ProfileProvider>
          <GoogleOAuthProvider clientId="1012278096706-4v2nm13buqr56b7g7emvpou3b6muk4lk.apps.googleusercontent.com">
            {children}
          </GoogleOAuthProvider>
        </ProfileProvider>
      </body>
    </html>
  );
}
