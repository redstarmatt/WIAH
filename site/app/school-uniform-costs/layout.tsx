import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'School Uniform Costs',
  description: 'A school uniform costs an average of 422 per child per year consuming nearly 3% of the annual income of families in the poorest fifth.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
