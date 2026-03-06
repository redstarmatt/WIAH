import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Immigration Detention',
  description: 'On any given day, around 2,900 people are held in immigration detention in the UK, with no legal time limit on how long they can be held.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
