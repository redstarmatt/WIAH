import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Health Tech Adoption',
  description: 'NHS digital transformation remains patchy, with wide variation in electronic records, telemedicine, and AI adoption across trusts.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
