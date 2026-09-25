import type { Metadata } from 'next';
<<<<<<< HEAD
import { Inter, Roboto_Mono, Space_Grotesk } from 'next/font/google';
=======
import { Inter } from 'next/font/google';
>>>>>>> refs/remotes/origin/main
import './globals.css';
import { cn } from '@/lib/utils';
import { Providers } from './providers';
import { ClientShell } from './client-shell';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
<<<<<<< HEAD

const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});
=======
>>>>>>> refs/remotes/origin/main

export const metadata: Metadata = {
  title: 'Apex Crypto Wallet',
  description: 'Institutional-grade self-custodial crypto wallet.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/apex-icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '512x512', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <html lang="en" className={cn('h-full', inter.variable, roboto_mono.variable, space_grotesk.variable)} suppressHydrationWarning>
      <body className={cn('font-body antialiased h-full', inter.className)}>
=======
    <html lang="en" className={cn('h-full', inter.variable)} suppressHydrationWarning>
      <head suppressHydrationWarning>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={cn('font-body antialiased h-full')}>
>>>>>>> refs/remotes/origin/main
        <Providers>
          <ClientShell>
            {children}
          </ClientShell>
        </Providers>
      </body>
    </html>
  );
}
