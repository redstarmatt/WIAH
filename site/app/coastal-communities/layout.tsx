import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coastal Communities',
  description: 'Coastal communities in England are among the most economically deprived in the country: average wages are 17% below the national median, and child poverty rates',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
