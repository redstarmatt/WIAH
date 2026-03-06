import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Drug Misuse',
  description: 'Drug poisoning deaths in England and Wales reached a record 4,907 in 2021 and have remained at near-record levels, driven by an ageing cohort of heroin users an',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
