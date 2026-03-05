import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Youth Wages',
  description: 'Workers aged 18 24 earn 41% less than the median adult wage a gap that has widened since 2010 despite minimum wage increases.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
