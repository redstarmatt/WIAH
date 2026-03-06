import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Society & Democracy',
  description: 'The median full-time worker in London earns £46,100 — £15,900 more than their counterpart in Wales or the North East (£30,200). The gap has nearly quadrupled si',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
