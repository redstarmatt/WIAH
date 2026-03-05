import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Broadband & Digital',
  description: 'Data and analysis on Broadband & Digital in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
