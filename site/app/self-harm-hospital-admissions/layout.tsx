import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Self-Harm Hospital Admissions',
  description: 'Hospital admissions for self-harm among young women aged 15-19 have risen by over 70% in a decade.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
