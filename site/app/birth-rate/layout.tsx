import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Birth Rate',
  description: 'The UK\'s total fertility rate fell to 1.44 in 2023 — the lowest since records began in 1938, and well below the 2.1 replacement level. Scotland\'s rate is just 1',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
