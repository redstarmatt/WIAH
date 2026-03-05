import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Green Belt Pressure',
  description: 'Planning applications on green belt land have risen 40% since 2018, reigniting debate between housing need and environmental protection.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
