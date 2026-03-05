import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Period Poverty',
  description: 'One in five girls aged 14 21 has struggled to afford period products in the past year, according to Plan International. Period poverty affects school attendance',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
