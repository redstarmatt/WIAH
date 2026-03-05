import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Empty Homes',
  description: 'England has approximately 700,000 empty properties enough to house every person on a local authority waiting list. Long-term vacancies have risen every year sin',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
