import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education',
  description: 'Special school applications outstrip places by 30%, with 5,200 children currently without a placement — some waiting over a year for a school.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
