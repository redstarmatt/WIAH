import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Housebuilding',
  description: 'England needs 300,000 new homes per year. It has not built this many since the 1960s. Just 234,000 homes were completed in 2022/23. Planning permission grants f',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
