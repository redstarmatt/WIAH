import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ADHD &amp; Autism',
  description: 'Adults wait an average of 5 7 years for an autism diagnosis on the NHS. ADHD assessment waits routinely exceed 3 years in most areas. 187,000 children are waiti',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
