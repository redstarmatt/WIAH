import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adult Education',
  description: 'Adult participation in learning has fallen from 20% to 15% since 2015. Further education enrolments have declined by 30% in a decade, from 3.3 million to 2.3 mi',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
