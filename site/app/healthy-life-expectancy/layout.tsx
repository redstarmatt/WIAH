import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Healthy Life Expectancy',
  description: 'Men can expect 62.9 healthy years; women 63.4. Both have barely moved in 15 years. Men spend 16 years in poor health, women 19.5 years. The gap between the most',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
