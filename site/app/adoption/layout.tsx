import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Are Fewer Children Being Adopted?',
  description: 'Adoption orders in England have fallen 45&percnt; since their 2015 peak, from 5,360 to 2,950 in 2023. Children who are adopted wait an average of 538 days from entering care to their Adoption Order — nearly 18 months — and children from Black and minority ethnic backgrounds wait significantly longer.',
  openGraph: {
    title: 'Why Are Fewer Children Being Adopted?',
    description: 'Adoption orders in England have fallen 45&percnt; since their 2015 peak, from 5,360 to 2,950 in 2023. Children who are adopted wait an average of 538 days from entering care to their Adoption Order — nearly 18 months — and children from Black and minority ethnic backgrounds wait significantly longer.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/adoption',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Are Fewer Children Being Adopted?',
    description: 'Adoption orders in England have fallen 45&percnt; since their 2015 peak, from 5,360 to 2,950 in 2023. Children who are adopted wait an average of 538 days from entering care to their Adoption Order — nearly 18 months — and children from Black and minority ethnic backgrounds wait significantly longer.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/adoption',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
