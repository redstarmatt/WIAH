import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Returnerships & Over-50s Work',
  description: 'Over 3.5 million people aged 50-64 are economically inactive, with limited returner programmes available.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
