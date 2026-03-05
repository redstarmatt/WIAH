import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Domestic Abuse Outcomes',
  description: 'Police receive 1.5 million domestic abuse calls a year but only 1 in 10 results in a prosecution.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
