import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Children in Care',
  description: '83,840 children were in local authority care in England in 2023 up 38% since 2009. Only 6% of care leavers go to university, versus 43% of all young people. One',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
