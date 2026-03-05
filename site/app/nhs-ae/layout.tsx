import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS A&amp;E',
  description: 'Only 70% of patients are seen within 4 hours in major A E departments the target is 95%. This target has not been consistently met since 2015. Over 300,000 pati',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
