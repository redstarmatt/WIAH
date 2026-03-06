import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alcohol',
  description: 'Alcohol-related hospital admissions have risen to 980,000 a year up 17% since 2010. Over 8,000 people die from alcohol-specific causes each year. Per-capita con',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
