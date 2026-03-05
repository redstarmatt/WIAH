import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Foster Placement Shortage',
  description: 'England needs 8,700 more foster carers meaning one in three children who needs fostering cannot be placed locally, often entering costly residential care instea',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
