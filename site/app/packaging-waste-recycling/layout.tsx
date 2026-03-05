import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Packaging Waste Recycling',
  description: 'The UK recycles 68% of packaging waste overall, but plastic recycling sits at 51% — well below the 2030 targets — and contamination undermines collection stream',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
