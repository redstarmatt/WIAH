import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disability & Poverty',
  description: 'The disability poverty rate is 29% — nearly double the non-disabled rate of 16%. Disabled households face an estimated £570/month in additional costs relating t',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
