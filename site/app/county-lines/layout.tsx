import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Are Children Being Exploited by Drug Gangs?',
  description: 'An estimated 10,000 children are involved in county lines drug dealing across England and Wales. Despite police operations closing hundreds of lines, the model has adapted and referrals of exploited children continue to rise year on year.',
  openGraph: {
    title: 'How Are Children Being Exploited by Drug Gangs?',
    description: 'An estimated 10,000 children are involved in county lines drug dealing across England and Wales. Despite police operations closing hundreds of lines, the model has adapted and referrals of exploited children continue to rise year on year.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/county-lines',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How Are Children Being Exploited by Drug Gangs?',
    description: 'An estimated 10,000 children are involved in county lines drug dealing across England and Wales. Despite police operations closing hundreds of lines, the model has adapted and referrals of exploited children continue to rise year on year.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/county-lines',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
