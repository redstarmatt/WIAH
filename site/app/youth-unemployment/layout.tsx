import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Youth Unemployment',
  description: 'One in eight young people aged 16 24 is NEET not in education, employment or training with the figure rising since the pandemic and disproportionately affecting',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
