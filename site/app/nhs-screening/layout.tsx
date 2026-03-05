import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cancer Screening',
  description: 'Cancer screening uptake in England has fallen below recommended thresholds for all three national screening programmes, with younger age groups and deprived com',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
