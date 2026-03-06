import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS Waiting Lists',
  description: 'Over 7.5 million people are waiting for elective NHS treatment in England equivalent to one in eight of the population with over 300,000 waiting more than a yea',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
