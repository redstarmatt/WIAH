import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Care Waiting Times',
  description: '415,000 people in England are waiting for a social care assessment or service. One in three waits more than 6 months. An estimated 1.5 million people have unmet',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
