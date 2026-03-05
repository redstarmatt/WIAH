import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Special Guardianship',
  description: '36,000 children live under special guardianship orders a route that offers permanence without adoption, but with far less state support.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
