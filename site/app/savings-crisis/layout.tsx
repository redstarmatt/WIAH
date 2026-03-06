import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How financially resilient are British households?',
  description: 'One in four UK adults has less than £100 in savings. The bottom fifth of earners has a median savings balance of just £170 — leaving millions one unexpected bill away from debt. Savings rates collapsed to record lows before COVID.',
  openGraph: {
    title: 'How financially resilient are British households?',
    description: 'One in four UK adults has less than £100 in savings. The bottom fifth of earners has a median savings balance of just £170 — leaving millions one unexpected bill away from debt. Savings rates collapsed to record lows before COVID.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/savings-crisis',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How financially resilient are British households?',
    description: 'One in four UK adults has less than £100 in savings. The bottom fifth of earners has a median savings balance of just £170 — leaving millions one unexpected bill away from debt. Savings rates collapsed to record lows before COVID.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/savings-crisis',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
