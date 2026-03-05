import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disability Hate Crime',
  description: 'Disability hate crime reports have risen 80% since 2015 to 12,300 recorded offences — but fewer than 1 in 10 cases results in a charge.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
