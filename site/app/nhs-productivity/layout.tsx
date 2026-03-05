import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS Productivity',
  description: 'NHS productivity remains 3 4% below its pre-COVID level despite a 17% increase in staff numbers since 2019. Output per worker has fallen by nearly 10% since 201',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
