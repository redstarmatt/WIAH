import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UK Wildfire Risk',
  description: 'Wildfires in the UK have increased by 50% in the last decade, with climate change extending fire seasons.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
