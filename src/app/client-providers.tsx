'use client';

import type { ReactNode } from 'react';
<<<<<<< HEAD
=======
import { FirebaseClientProvider } from '@/firebase/client-provider';
>>>>>>> refs/remotes/origin/main
import { WalletProvider } from '@/context/wallet-context';
import { CurrencyProvider } from '@/context/currency-context';
import AppContent from './app-content';
import { Toaster } from '@/components/ui/toaster';

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
<<<<<<< HEAD
    <WalletProvider>
      <CurrencyProvider>
        <AppContent>
          {children}
        </AppContent>
        <Toaster />
      </CurrencyProvider>
    </WalletProvider>
=======
    <FirebaseClientProvider>
      <WalletProvider>
        <CurrencyProvider>
          <AppContent>
            {children}
          </AppContent>
          <Toaster />
        </CurrencyProvider>
      </WalletProvider>
    </FirebaseClientProvider>
>>>>>>> refs/remotes/origin/main
  );
}
