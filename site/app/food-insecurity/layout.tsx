import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Food Insecurity',
  description: 'Food bank use has risen twelve-fold since 2012, and one in five children now lives in a household that regularly goes without food.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
