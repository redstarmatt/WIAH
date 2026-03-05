import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spiking Reports',
  description: 'Police recorded spiking reports more than doubled between 2019 and 2024, though under-reporting remains significant.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
