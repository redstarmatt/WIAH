import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Are NHS Buildings Falling Apart?',
  description: 'The NHS maintenance backlog has tripled from &pound;4.3 billion in 2014 to &pound;13.8 billion in 2024. One in four NHS buildings is rated high-risk for infrastructure failure. Forty-two trusts have buildings containing RAAC &mdash; the same crumbling concrete that closed schools.',
  openGraph: {
    title: 'Are NHS Buildings Falling Apart?',
    description: 'The NHS maintenance backlog has tripled from &pound;4.3 billion in 2014 to &pound;13.8 billion in 2024. One in four NHS buildings is rated high-risk for infrastructure failure. Forty-two trusts have buildings containing RAAC &mdash; the same crumbling concrete that closed schools.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/nhs-capital',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Are NHS Buildings Falling Apart?',
    description: 'The NHS maintenance backlog has tripled from &pound;4.3 billion in 2014 to &pound;13.8 billion in 2024. One in four NHS buildings is rated high-risk for infrastructure failure. Forty-two trusts have buildings containing RAAC &mdash; the same crumbling concrete that closed schools.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/nhs-capital',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
