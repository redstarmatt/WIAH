import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS Staffing',
  description: 'Data and analysis on NHS Staffing in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
