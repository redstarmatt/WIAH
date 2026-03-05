import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Online Harms',
  description: 'Online fraud accounts for 41% of all crime in England and Wales 3.8 million incidents per year. Reports of child sexual abuse material online reached 1.2 millio',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
