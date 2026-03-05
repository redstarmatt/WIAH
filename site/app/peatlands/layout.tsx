import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Peatlands',
  description: 'UK peatlands store 3.2 billion tonnes of carbon more than all forests in the UK, France, and Germany combined. But 80% are degraded and currently emit 23 millio',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
