import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Youth Justice',
  description: 'The number of children in custody in England and Wales has fallen dramatically from over 3,000 in 2008 to around 430 in 2024. But those who remain in custody ar',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
