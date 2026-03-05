import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Startup Investment',
  description: 'UK VC investment halved from its 2021 peak but Britain still produces more tech unicorns per capita than any country except the US.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
