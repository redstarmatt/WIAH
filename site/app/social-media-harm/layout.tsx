import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Media Harm',
  description: '40% of girls aged 11 15 experience cyberbullying online. Teen girls rates of depression have doubled since 2012 a period that precisely tracks mass smartphone a',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
