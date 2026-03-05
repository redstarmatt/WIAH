import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ambulance Rural Response',
  description: 'Rural ambulance response times are on average 8 minutes longer than urban areas for Category 2 calls.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
