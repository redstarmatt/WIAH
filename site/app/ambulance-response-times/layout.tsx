import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ambulance Response Times',
  description: 'Category 1 response times are 20% above target; Category 2 takes more than twice the target time.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
