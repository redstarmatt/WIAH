import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is Britain on track to become a wind energy superpower?',
  description: "The UK has 14.7 GW of installed offshore wind — second in the world behind China. The government's 50 GW by 2030 target is ambitious: current trajectory suggests 35–40 GW is achievable, if grid upgrades and planning keep pace.",
  openGraph: {
    title: 'Is Britain on track to become a wind energy superpower?',
    description: "The UK has 14.7 GW of installed offshore wind — second in the world behind China. The government's 50 GW by 2030 target is ambitious: current trajectory suggests 35–40 GW is achievable, if grid upgrades and planning keep pace.",
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/offshore-wind',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is Britain on track to become a wind energy superpower?',
    description: "The UK has 14.7 GW of installed offshore wind — second in the world behind China. The government's 50 GW by 2030 target is ambitious: current trajectory suggests 35–40 GW is achievable, if grid upgrades and planning keep pace.",
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/offshore-wind',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
