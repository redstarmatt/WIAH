import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pensions',
  description: '14 million workers have no workplace pension and the UK state pension replacement rate of 28% of earnings is one of the lowest in the OECD despite auto-enrolmen',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
