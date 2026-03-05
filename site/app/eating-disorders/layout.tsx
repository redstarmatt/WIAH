import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eating Disorders',
  description: 'Hospital admissions for eating disorders have doubled since 2011 and NHS waiting times for treatment sometimes exceeding two years regularly cause irreversible ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
