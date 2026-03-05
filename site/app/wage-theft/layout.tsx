import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wage Theft',
  description: '355,000 workers are paid below the National Living Wage each year, but prosecutions average just 9 per year — leaving billions in stolen wages unrecovered.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
