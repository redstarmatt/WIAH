import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Family Courts',
  description: '62,400 cases are outstanding in England s family courts up 64% from pre-pandemic levels. The average private law case now takes 50 weeks to resolve, double the ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
