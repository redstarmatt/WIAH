import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Violence Against Women',
  description: 'The charge rate for rape in England and Wales is just 3.3%, meaning fewer than 1 in 30 reported rapes results in a charge.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
