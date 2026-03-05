import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pensioner Poverty',
  description: 'Pensioner poverty fell dramatically between 1997 and 2012, but has been creeping back up since, with 2.1 million pensioners now living below the poverty line di',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
