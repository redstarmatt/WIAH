import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gambling Harm Treatment',
  description: 'Problem gambling affects around 300,000 people but NHS treatment capacity remains severely limited, with waits of up to 8 weeks.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
