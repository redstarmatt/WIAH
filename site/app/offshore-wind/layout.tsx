import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Offshore Wind',
  description: 'The UK has 14.7 GW of installed offshore wind second in the world behind China. The government s 50 GW by 2030 target is ambitious: current trajectory suggests ',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
