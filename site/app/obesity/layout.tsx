import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Obesity',
  description: '28% of adults in England are obese double the 1990s rate. A further 38% are overweight. Obesity costs the NHS 6.1 billion per year. The UK has the highest obesi',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
