// app/layout.tsx
import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import './globals.css'; // or your primary styling directory layout

export const metadata: Metadata = {
  title: 'Maha OS | Sovereign Mobile Ecosystem',
  description: 'Localized processing architecture engineering user biological and digital sovereignty.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#0A0A0A] antialiased min-h-screen pt-16">
        {/* 1. The Navbar Mounts Here Global Node */}
        <Navbar />

        {/* 2. Page Content Hydrates Here */}
        {children}
      </body>
    </html>
  );
}