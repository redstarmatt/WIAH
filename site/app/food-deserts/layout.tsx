import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Food Deserts',
  description: 'Around 8 million people in the UK live more than a mile from a supermarket and have limited access to fresh food. Deprived areas have five times fewer supermark',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
