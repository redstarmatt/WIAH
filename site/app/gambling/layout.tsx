import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Big Is Britain's Gambling Problem?",
  description: '430,000 people in England are problem gamblers. Online gambling gross yield has grown to £7.1 billion. Betting shops have halved since 2010. The 2023 White Paper introduced stake limits on online slots — but affordability checks remain contentious and delayed.',
  openGraph: {
    title: "How Big Is Britain's Gambling Problem?",
    description: '430,000 people in England are problem gamblers. Online gambling gross yield has grown to £7.1 billion. Betting shops have halved since 2010. The 2023 White Paper introduced stake limits on online slots — but affordability checks remain contentious and delayed.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/gambling',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Big Is Britain's Gambling Problem?",
    description: '430,000 people in England are problem gamblers. Online gambling gross yield has grown to £7.1 billion. Betting shops have halved since 2010. The 2023 White Paper introduced stake limits on online slots — but affordability checks remain contentious and delayed.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/gambling',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
