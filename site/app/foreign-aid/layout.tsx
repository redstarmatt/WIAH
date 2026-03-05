import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Foreign Aid',
  description: 'The UK cut overseas development assistance from 0.7% to 0.5% of GNI in 2021, withdrawing approximately 4 billion annually from programmes fighting malaria, fami',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
