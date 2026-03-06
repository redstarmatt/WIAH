import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Has Happened to Collective Bargaining in Britain?',
  description: 'Trade union membership stands at 6.73 million &mdash; less than half the 1979 peak of 13.2 million. Only 23&percnt; of UK workers are union members, one of the lowest rates in Western Europe. Yet the 2022&ndash;23 strike wave &mdash; 3.87 million working days lost, the highest since 1989 &mdash; showed that unions retain significant disruptive power in public services.',
  openGraph: {
    title: 'What Has Happened to Collective Bargaining in Britain?',
    description: 'Trade union membership stands at 6.73 million &mdash; less than half the 1979 peak of 13.2 million. Only 23&percnt; of UK workers are union members, one of the lowest rates in Western Europe. Yet the 2022&ndash;23 strike wave &mdash; 3.87 million working days lost, the highest since 1989 &mdash; showed that unions retain significant disruptive power in public services.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/trade-unions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Has Happened to Collective Bargaining in Britain?',
    description: 'Trade union membership stands at 6.73 million &mdash; less than half the 1979 peak of 13.2 million. Only 23&percnt; of UK workers are union members, one of the lowest rates in Western Europe. Yet the 2022&ndash;23 strike wave &mdash; 3.87 million working days lost, the highest since 1989 &mdash; showed that unions retain significant disruptive power in public services.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/trade-unions',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
