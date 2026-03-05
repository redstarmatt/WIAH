import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disabled Children&apos;s Care',
  description: '240,000 disabled children are estimated to need social care support, but fewer than 90,000 receive it.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
