import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Foster Care',
  description: 'England has lost over 5,000 foster carer households since 2015 an 11% decline while the number of children needing placements has risen. One in eight looked-aft',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
