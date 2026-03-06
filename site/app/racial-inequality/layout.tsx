import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Wide Are Britain&apos;s Racial Gaps in Pay, Wealth, and Work?',
  description: 'The ethnic pay gap remains stubbornly persistent at around 5&percnt; for all ethnic minorities combined &mdash; but this aggregate figure conceals much wider gaps for specific groups. Black workers face unemployment rates twice those of white workers. The median wealth of Black African households is &pound;34,000, compared with &pound;314,000 for white British households &mdash; a ninefold gap.',
  openGraph: {
    title: 'How Wide Are Britain&apos;s Racial Gaps in Pay, Wealth, and Work?',
    description: 'The ethnic pay gap remains stubbornly persistent at around 5&percnt; for all ethnic minorities combined &mdash; but this aggregate figure conceals much wider gaps for specific groups. Black workers face unemployment rates twice those of white workers. The median wealth of Black African households is &pound;34,000, compared with &pound;314,000 for white British households &mdash; a ninefold gap.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/racial-inequality',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Wide Are Britain&apos;s Racial Gaps in Pay, Wealth, and Work?',
    description: 'The ethnic pay gap remains stubbornly persistent at around 5&percnt; for all ethnic minorities combined &mdash; but this aggregate figure conceals much wider gaps for specific groups. Black workers face unemployment rates twice those of white workers. The median wealth of Black African households is &pound;34,000, compared with &pound;314,000 for white British households &mdash; a ninefold gap.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/racial-inequality',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
