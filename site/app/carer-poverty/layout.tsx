import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Carer Poverty',
  description: 'Carers Allowance is £76.75 per week — the lowest benefit of its kind in Europe. It is withdrawn if the carer earns over £151 per week, creating a poverty trap. ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
