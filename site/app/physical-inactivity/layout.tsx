import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Physical Inactivity',
  description: 'Less than two thirds of adults in England meet the recommended 150 minutes of moderate physical activity per week, and physical inactivity costs the NHS 7.4 bil',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
