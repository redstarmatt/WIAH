import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dementia Support',
  description: 'Just 64% of people with dementia receive a formal diagnosis and 40% get no structured post-diagnostic support, despite the Prime Minister s Dementia Challenge.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
