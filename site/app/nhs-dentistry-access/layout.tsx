import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS Dental Access',
  description: '43 million adults in England cannot access an NHS dentist when they need one. The number of NHS dental treatments completed has fallen by 4.7 million since 2019',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
