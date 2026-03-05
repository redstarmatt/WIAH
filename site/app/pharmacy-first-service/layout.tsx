import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pharmacy First Service',
  description: 'The Pharmacy First scheme has freed up over 1.4 million GP appointments in its first year but access remains patchy.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
