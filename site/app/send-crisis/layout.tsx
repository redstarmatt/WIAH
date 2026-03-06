import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEND Crisis',
  description: '576,000 children in England have an Education, Health and Care Plan — up 143% since 2014. The average wait is 28 weeks, against a 20-week legal limit. When pare',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
