import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nature-Based Solutions',
  description: 'Nature-based solutions could provide 15% of the UK\'s net zero pathway but are currently delivering just 3% of potential — though peatland restoration is acceler',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
