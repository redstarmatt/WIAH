import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Public Toilets',
  description: 'The number of council-run public toilets in England has fallen from 5,600 in 2000 to around 2,350 in 2024 a 58% decline. Local authority spending on public conv',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
