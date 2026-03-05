import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Immigration',
  description: 'Net migration to the UK reached a record 745,000 in the year to December 2022 nearly three times pre-Brexit levels. It fell to an estimated 685,000 in 2023. Wor',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
