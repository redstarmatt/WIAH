import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Flexible Working Access',
  description: '78% of flexible working requests are approved but low-paid workers are half as likely to be offered flexible options in the first place.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
