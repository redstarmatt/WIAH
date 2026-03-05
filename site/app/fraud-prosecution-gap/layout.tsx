import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fraud Prosecution Gap',
  description: 'Fraud accounts for 40% of crime by volume in England and Wales, but receives just 1% of police resources.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
