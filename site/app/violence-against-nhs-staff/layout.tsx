import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Violence Against NHS Staff',
  description: 'Over 200 assaults on NHS staff are reported every day, with the trend worsening post-pandemic.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
