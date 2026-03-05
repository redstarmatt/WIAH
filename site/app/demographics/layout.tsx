import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Demographics',
  description: 'Data and analysis on Demographics in the UK.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
