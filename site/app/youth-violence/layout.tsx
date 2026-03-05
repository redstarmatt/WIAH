import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Youth Violence',
  description: 'Hospital admissions for assault among under-25s reached 7,100 in 2024, the highest level since 2012. Serious youth violence offences have risen 57% in a decade,',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
