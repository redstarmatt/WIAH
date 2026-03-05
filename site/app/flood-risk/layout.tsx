import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flood Risk',
  description: '5.2 million properties in England are at risk of flooding, and the cost of flood damage has tripled since 2000 as climate change intensifies extreme weather eve',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
