import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Living Wage',
  description: 'Despite the National Living Wage rising to 11.44/hr in 2024, an estimated 3.8 million workers still earn below the Real Living Wage of 12.60/hr the independentl',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
