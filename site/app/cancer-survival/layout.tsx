import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cancer Survival',
  description: 'Five-year cancer survival in England rose from 46% in 2005 to 55.4% in 2023 a 9.4 percentage-point improvement. This is one of the biggest sustained improvement',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
