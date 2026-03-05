import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'School Funding',
  description: 'Real per-pupil school funding in England in 2023 is still 9% below its 2009 peak, despite recent increases. Special educational needs funding carries a £2.1 bil',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
