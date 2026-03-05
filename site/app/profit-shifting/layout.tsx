import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profit Shifting',
  description: 'HMRC estimates £6.5 billion in corporate tax goes unpaid each year, with multinational profit-shifting accounting for the largest share.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
