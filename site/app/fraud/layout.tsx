import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fraud',
  description: 'Fraud accounts for 41% of all crime in England and Wales an estimated 3.8 million offences per year yet fewer than 1% of reported cases result in a conviction. ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
