import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "How Wide Are Britain's Racial Gaps in Pay, Wealth, and Work?",
  description: 'The ethnic pay gap remains stubbornly persistent at around 5&percnt; for all ethnic minorities combined — but this aggregate figure conceals much wider gaps for specific groups. Black workers face unemployment rates twice those of white workers. The median wealth of Black African households is £34,000, compared with £314,000 for white British households — a ninefold gap.',
  openGraph: {
    title: "How Wide Are Britain's Racial Gaps in Pay, Wealth, and Work?",
    description: 'The ethnic pay gap remains stubbornly persistent at around 5&percnt; for all ethnic minorities combined — but this aggregate figure conceals much wider gaps for specific groups. Black workers face unemployment rates twice those of white workers. The median wealth of Black African households is £34,000, compared with £314,000 for white British households — a ninefold gap.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/racial-inequality',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How Wide Are Britain's Racial Gaps in Pay, Wealth, and Work?",
    description: 'The ethnic pay gap remains stubbornly persistent at around 5&percnt; for all ethnic minorities combined — but this aggregate figure conceals much wider gaps for specific groups. Black workers face unemployment rates twice those of white workers. The median wealth of Black African households is £34,000, compared with £314,000 for white British households — a ninefold gap.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/racial-inequality',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
