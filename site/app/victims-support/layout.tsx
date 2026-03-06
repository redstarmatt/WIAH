import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Victims&apos; Support',
  description: 'Victim satisfaction with the criminal justice system has fallen to 56.5% down from 73% in 2015. Fewer than half of victims say they were kept adequately informe',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
