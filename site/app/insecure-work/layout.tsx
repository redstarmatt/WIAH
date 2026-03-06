import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Insecure Work',
  description: 'Over 1 million workers are on zero-hours contracts in the UK. 4.4 million are in insecure work (zero-hours, temporary, or agency). The gig economy grew 400% bet',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
