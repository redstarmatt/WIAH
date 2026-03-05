import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Female Entrepreneurship',
  description: 'Female-founded businesses have risen steadily, but women still start only 1 in 4 businesses and receive just 2p of every £1 in venture capital.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
