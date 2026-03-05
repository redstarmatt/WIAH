import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Net Migration',
  description: 'Net migration to the UK reached a record 906,000 in the year to June 2023 driven largely by students and workers from non-EU countries filling vacancies in heal',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
