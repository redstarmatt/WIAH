import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Urban Heat',
  description: 'The summer of 2022 saw UK temperatures exceed 40 C for the first time, with over 2,800 excess deaths attributed to the heatwave. Urban areas are significantly h',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
