import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GP List Size',
  description: 'The average GP now looks after 2,271 patients and in some practices, a single doctor covers over 4,000.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
