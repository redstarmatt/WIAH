import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health',
  description: 'NHS dental treatment has collapsed since the pandemic, with 42% of adults unable to access an NHS dentist and children s tooth extractions becoming the most com',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
