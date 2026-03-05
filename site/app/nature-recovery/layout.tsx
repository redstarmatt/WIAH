import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nature Recovery',
  description: 'England s 48 Local Nature Recovery Strategies are being finalised in 2024 a first-ever legal framework for nature. Mandatory Biodiversity Net Gain came into for',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
