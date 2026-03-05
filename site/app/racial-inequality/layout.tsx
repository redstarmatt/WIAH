import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Racial Inequality',
  description: 'The ethnic pay gap remains stubbornly persistent at around 5% for all ethnic minorities combined but this aggregate figure conceals much wider gaps for specific',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
