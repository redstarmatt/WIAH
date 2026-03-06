import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Building Safety',
  description: 'Nearly eight years after the Grenfell Tower fire killed 72 people, over 3,600 residential buildings with unsafe cladding have not yet completed remediation. An ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
