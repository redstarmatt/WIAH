import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workplace Fatalities',
  description: '138 workers were killed at work in 2023/24 the lowest rate since records began, but construction and agriculture remain disproportionately deadly.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
