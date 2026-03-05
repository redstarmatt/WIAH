import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Arts Funding',
  description: 'Arts Council England s budget fell 36% in real terms between 2010 and 2024. Local authority arts spending fell 57% over the same period. In the 2023 portfolio r',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
