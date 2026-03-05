import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coastal Erosion Risk',
  description: '100,000 homes face significant coastal erosion risk by 2050 and managed retreat means some communities will be allowed to flood permanently.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
