import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regional GDP Gap',
  description: 'London\'s GDP per head is £67,500 — three times higher than the North East at £22,100 — the widest regional divide of any comparable economy.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
