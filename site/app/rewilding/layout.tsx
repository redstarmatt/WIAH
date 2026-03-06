import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rewilding',
  description: 'The UK has committed to protecting 30% of land for nature by 2030 the so-called 30x30 pledge but only 3.2% of land currently meets ecological standards. With fe',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
