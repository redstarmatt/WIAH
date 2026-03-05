import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Education',
  description: 'Girls make up only 22% of physics A-level entrants and 16% of computing — gaps that narrow the pipeline to well-paid technical careers.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
