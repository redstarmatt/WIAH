import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education',
  description: 'Only 14% of looked-after children achieve expected GCSE standards, compared to 48% of all pupils, and 1 in 3 changes school mid-year.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
