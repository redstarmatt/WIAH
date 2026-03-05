import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Maternity Safety',
  description: 'The stillbirth rate has halved since 2010 to a record low of 3.53 per 1,000 births. But Black women are 3.7 times more likely to die in childbirth than white wo',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
