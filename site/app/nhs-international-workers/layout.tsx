import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NHS International Workers',
  description: 'One in three NHS nurses trained outside the UK the highest proportion on record, raising concerns about global health equity.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
