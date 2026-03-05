import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education',
  description: 'Stacked postgraduate loan repayments now give some graduates a marginal effective tax rate of up to 68% — making advanced study financially ruinous for many.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
