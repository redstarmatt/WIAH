import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smart Meter Rollout',
  description: '57% of UK homes have a smart meter, but 25% of installed meters are operating in dumb mode not communicating with suppliers undermining the programme s purpose.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
