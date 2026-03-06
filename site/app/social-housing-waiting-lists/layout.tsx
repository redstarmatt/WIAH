import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Social Housing Waiting Lists',
  description: '1.29 million households are on social housing waiting lists in England, with the typical wait in London now over 10 years.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
