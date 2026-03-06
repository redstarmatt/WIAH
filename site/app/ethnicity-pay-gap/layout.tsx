import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ethnicity Pay Gap',
  description: 'Workers from Bangladeshi and Pakistani backgrounds earn over 20% less than their White British peers — a gap that has barely narrowed in a decade.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
