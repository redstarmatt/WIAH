import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ethnic Minority Poverty',
  description: '46% of people from ethnic minority backgrounds live in poverty — more than double the 21% rate for white British people — with Bangladeshi and Pakistani househo',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
