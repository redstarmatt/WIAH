import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UK Carbon Budget',
  description: 'UK emissions fell 4.7% in 2023 to 415 MtCO2e broadly on track for the Fourth Carbon Budget, but needing to accelerate to reach net zero by 2050.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
