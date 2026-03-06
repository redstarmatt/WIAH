import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Benefit Sanctions',
  description: '786,000 Universal Credit sanctions were applied in 2023 and research shows sanctions increase food bank referrals and destitution without improving employment.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
