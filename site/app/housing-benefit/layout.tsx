import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Housing Benefit',
  description: 'The Local Housing Allowance was frozen for four years until 2024, leaving recipients facing an average gap of 190 per month between benefit and actual rent push',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
