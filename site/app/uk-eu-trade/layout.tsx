import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'UK-EU Trade',
  description: 'UK goods exports to the EU fell by an estimated 15% relative to trend after Brexit, while the administrative burden has added over 1.8 million forms a month.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
