import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Antidepressant Prescribing',
  description: '93 million antidepressant prescriptions in 2023 more than one for every adult in England, with prescriptions more than doubling since 2010 and long-term use gro',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
