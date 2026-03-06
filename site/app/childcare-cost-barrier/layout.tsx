import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Childcare Cost',
  description: 'UK full-time childcare for a child under two now costs £14,000 per year — more than a mortgage — and 1 in 3 parents has reduced work hours or left employment be',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
