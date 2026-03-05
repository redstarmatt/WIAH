import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flood Insurance Gaps',
  description: '200,000 properties are only insurable through the Flood Re scheme and 5.2 million are in areas at significant flood risk.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
