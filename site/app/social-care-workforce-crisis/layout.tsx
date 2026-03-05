import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Care Workforce',
  description: 'The social care sector has 152,000 vacancies a 9.9% vacancy rate that leaves vulnerable people without the support they need.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
