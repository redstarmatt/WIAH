import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Judicial Diversity',
  description: 'Women make up 35% of judges in England and Wales but just 28% of Court of Appeal judges. Ethnic minority representation stands at 9.8% overall in a country wher',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
