import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Childhood Obesity',
  description: '22.7% of Year 6 children in England are obese more than 1 in 5. Children in the most deprived areas are 3 times more likely to be obese than those in the least ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
