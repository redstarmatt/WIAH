import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apprenticeships',
  description: 'Apprenticeship starts have fallen 35% since the apprenticeship levy was introduced in 2017, with higher-level qualifications for existing employees replacing th',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
