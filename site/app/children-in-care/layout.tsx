import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Children in Care',
  description: '83,840 children were in local authority care in England in 2023 a 24% rise since 2010, driven by rising poverty and insufficient family support.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
