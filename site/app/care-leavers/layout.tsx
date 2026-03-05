import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Care Leavers',
  description: '95,000 children are in care in England. Each year 10,000 young people leave care aged 16 21 with 37% becoming NEET within a year. Care leavers are 4 times more ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
