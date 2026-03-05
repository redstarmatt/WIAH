import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bereavement Support',
  description: 'Around 600,000 people are bereaved each year in England. Fewer than 10% access specialist bereavement support.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
