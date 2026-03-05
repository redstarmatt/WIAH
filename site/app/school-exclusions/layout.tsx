import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'School Exclusions',
  description: '9,160 children were permanently excluded from English schools in 2022/23 up 77% since 2015/16. A further 787,000 suspensions were issued. Boys, children with SE',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
