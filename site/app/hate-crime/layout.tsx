import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hate Crime',
  description: 'Hate crime in England and Wales more than doubled between 2013 and 2023, reaching a record 147,000 offences, though rises partly reflect improved recording and ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
