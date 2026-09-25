'use client';

<<<<<<< HEAD
import type { ReactNode } from 'react';
import { ClientProviders } from './client-providers';

/**
 * Shell component that wraps the application in its required client-side context providers.
 */
=======
import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

const ClientProviders = dynamic(
  () => import('./client-providers').then(m => ({ default: m.ClientProviders })),
  { ssr: false }
);

>>>>>>> refs/remotes/origin/main
export function ClientShell({ children }: { children: ReactNode }) {
  return <ClientProviders>{children}</ClientProviders>;
}
