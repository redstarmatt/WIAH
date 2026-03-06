import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stalking',
  description: 'Police recorded 131,000 stalking offences in 2024 a 33-fold increase from 2015 but the charge rate has fallen to just 2.5%. Stalking remains one of the most und',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
