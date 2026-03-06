import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Armed Forces Recruitment',
  description: 'The British Army has 72,520 trained personnel below its 73,000 target and less than half its Cold War strength of 152,000. All three services are below establis',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
