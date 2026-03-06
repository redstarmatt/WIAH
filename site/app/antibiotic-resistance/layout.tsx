import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Antibiotic Resistance',
  description: 'Drug-resistant infections kill an estimated 7,000 people in the UK each year, and without action, AMR could become one of the leading causes of death globally b',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
