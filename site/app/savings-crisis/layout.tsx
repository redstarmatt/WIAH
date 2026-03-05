import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Poverty & Cost of Living',
  description: 'One in four UK adults has less than £100 in savings. The bottom fifth of earners has a median savings balance of just £170 — leaving millions one unexpected bil',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
