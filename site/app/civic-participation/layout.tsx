import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Civic Participation',
  description: 'Formal volunteering has declined from 28% to 24% of adults since 2010. But mutual aid and grassroots activity grew dramatically during COVID and has partly sust',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
