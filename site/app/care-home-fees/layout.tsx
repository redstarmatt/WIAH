import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Care Home Fees',
  description: 'The average care home fee in England is 1,200 per week 62,400 per year. Self-funders pay 41% more than council-funded residents. The CMA found self-funders effe',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
