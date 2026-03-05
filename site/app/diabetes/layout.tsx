import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diabetes',
  description: '5.6 million people in the UK have diabetes 4.4 million diagnosed, 1.2 million undiagnosed. Type 2 diabetes has tripled since the 1990s. The NHS spends 10 billio',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
