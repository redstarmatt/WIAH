import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Volunteering',
  description: 'Formal volunteering has fallen by a quarter since 2015, from 27% of adults volunteering monthly to just 20% in 2023. The pandemic accelerated a pre-existing dec',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
