import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Roboto } from 'next/font/google';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { CssBaseline } from '@mui/material';
import MuiProvider from '@/lib/providers/muiProvider';
import './globals.css';
import { HeaderServer } from '@/lib/components/header/HeaderServer';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'REST Client',
  description: 'RSS final project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <AppRouterCacheProvider>
          <CssBaseline />
          <MuiProvider>
            <HeaderServer />
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {children}
            </main>
          </MuiProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
