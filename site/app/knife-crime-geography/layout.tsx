import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Where Is Knife Crime Worst?',
  description: 'Knife offences vary 12-fold between police force areas &mdash; with London recording three times the national average rate.',
  openGraph: {
    title: 'Where Is Knife Crime Worst?',
    description: 'Knife offences vary 12-fold between police force areas &mdash; with London recording three times the national average rate.',
    type: 'article',
    url: 'https://whatisactuallyhappening.uk/knife-crime-geography',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Where Is Knife Crime Worst?',
    description: 'Knife offences vary 12-fold between police force areas &mdash; with London recording three times the national average rate.',
  },
  alternates: {
    canonical: 'https://whatisactuallyhappening.uk/knife-crime-geography',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
