import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fuel Poverty',
  description: '13.4% of English households 3.3 million homes are in fuel poverty. The energy price cap reached 3,549/year in January 2023. Excess winter deaths attributable to',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
