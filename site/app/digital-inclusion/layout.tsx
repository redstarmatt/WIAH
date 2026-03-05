import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Inclusion',
  description: 'Around 8 million UK adults lack basic digital skills. 1.5 million households have no internet access. Older adults, disabled people, and those in lower-income h',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
