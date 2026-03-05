import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eye Care',
  description: 'Over 630,000 patients are waiting for NHS ophthalmology appointments, and 22,000 people are at risk of preventable sight loss due to delayed follow-ups describe',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
