import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Is the BBC Becoming Unaffordable to Fund?',
  description: 'The BBC licence fee was frozen at &pound;159 and then increased below inflation until 2027, cutting real-terms income by over &pound;1 billion compared with what a CPI-linked fee would have generated. The result: 1,500&plus; redundancies, the closure of BBC4 as a broadcast channel, deep cuts to local radio, and an evasion rate approaching 10&percnt; as younger households treat it as optional.',
  openGraph: {
    title: 'Is the BBC Becoming Unaffordable to Fund?',
    description: 'The BBC licence fee was frozen at &pound;159 and then increased below inflation until 2027, cutting real-terms income by over &pound;1 billion compared with what a CPI-linked fee would have generated. The result: 1,500&plus; redundancies, the closure of BBC4 as a broadcast channel, deep cuts to local radio, and an evasion rate approaching 10&percnt; as younger households treat it as optional.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/public-broadcasting',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is the BBC Becoming Unaffordable to Fund?',
    description: 'The BBC licence fee was frozen at &pound;159 and then increased below inflation until 2027, cutting real-terms income by over &pound;1 billion compared with what a CPI-linked fee would have generated. The result: 1,500&plus; redundancies, the closure of BBC4 as a broadcast channel, deep cuts to local radio, and an evasion rate approaching 10&percnt; as younger households treat it as optional.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/public-broadcasting',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
