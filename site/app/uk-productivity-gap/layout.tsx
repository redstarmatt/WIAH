import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UK Productivity Gap',
  description: 'UK output per hour is 16% below the G7 average, a gap that has widened since 2008.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
