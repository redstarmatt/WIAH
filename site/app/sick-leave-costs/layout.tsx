import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sick Leave Costs',
  description: '185 million working days were lost to sickness absence in 2023, costing the economy an estimated 32 billion driven by a surge in long-term sick.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
