import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS Waiting Times',
  description: '7.54 million people are waiting for elective treatment the highest on record. Over 300,000 have been waiting more than a year. The 18-week standard the legal ma',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
