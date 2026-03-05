import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prison Mental Health',
  description: '70% of prisoners have at least two mental health diagnoses. Self-harm incidents have risen 208% since 2012, to over 74,000 per year. There were 86 apparent self',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
